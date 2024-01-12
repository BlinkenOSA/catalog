import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "../form/InputField";
import style from "./ForgotCardNumberForm.module.scss";
import {useEffect, useState} from "react";
import CaptchaField from "../form/CaptchaField";
import axios from "axios";
import {useAlert} from "react-alert";

const API = process.env.NEXT_PUBLIC_AMS_API;

const ForgotCardNumberForm = ({open, onClose, isMobile}) => {
	const alert = useAlert()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const initialValues = {
		'email': '',
		'email_confirm': ''
	}

	const handleSubmit = (values, {resetForm, setFieldError}) => {
		return axios.post(
			`${API}researcher-card-number/`,
			values
		).then(res => {
			setIsSubmitting(false)
			resetForm();
			alert.show(`Request successful! Please check your mailbox for your card number!`);
			onClose()
		}).catch((error) => {
			setIsSubmitting(false)
			if (error.response.status === 404) {
				setFieldError('email', `This e-mail address is not existing in our system. Please check the value again!`);
			}
		})
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Required'),
		email_confirm: Yup.string()
			.email('Invalid email address')
			.required('Required')
			.oneOf([Yup.ref('email'), null], 'E-mail and confirmation must match')
	})

	useEffect(() => {
		open && (document.body.style.overflow = 'hidden');
		!open && (document.body.style.overflow = 'unset');
	}, [open]);

	const handleClose = (formik) => {
		formik.resetForm();
		onClose();
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
		>
			{ formik => (
				<div
					onClick={() => handleClose(formik)}
					className={open ? `${style.Modal} ${style.Open}` : `${style.Modal} ${style.Closed}`}>
					<section className={isMobile ? `${style.ModalMain} ${style.Mobile}` : style.ModalMain} onClick={e => e.stopPropagation()}>
						<div className={style.Title}>Forgot Card Number</div>
							<div className={style.CloseButton} onClick={() => handleClose(formik)}>
								<span> </span>
								<span> </span>
							</div>
							<Form>
									<Field
										name="email"
										label="E-mail Address"
										type="email"
										required={true}
										component={InputField}
									/>
									<Field
										name="email_confirm"
										label="Confirm E-mail Address"
										type="email"
										required={true}
										component={InputField}
									/>
								<div className={style.Row}>
									<CaptchaField/>
								</div>
								<button className={style.FormButton} type="submit" disabled={isSubmitting}>
									Send Request
								</button>
							</Form>
					</section>
				</div>
			)}
		</Formik>
	)
}

export default ForgotCardNumberForm;