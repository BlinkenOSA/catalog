import {Field, Form, Formik} from 'formik';
import style from "./CartForm.module.scss";
import InputField from "../form/InputField";
import DatePickerField from "../form/DatePickerField";
import * as Yup from 'yup';
import {useCart} from "react-use-cart";
import CaptchaField from "../form/CaptchaField";
import axios from "axios";
import {useAlert} from "react-alert";
import dynamic from "next/dynamic";
import {useState} from "react";

const API = process.env.NEXT_PUBLIC_AMS_API;

const CartList = dynamic(() => import('./CartList'), {
    ssr: false
})

const CartForm = ({isMobile = false}) => {
    const {isEmpty, items, emptyCart} = useCart();
    const alert = useAlert()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getMaxDate = () => {
        const d = new Date();
        return new Date(d.setMonth(d.getMonth() + 6))
    }

    const validationSchema = Yup.object().shape({
        card_number: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        request_date: Yup.date().required('Required'),
        captcha: Yup.string().required('Required'),
        items: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                origin: Yup.string(),
                type: Yup.string(),
                volume: Yup.string()
                    .when('primary_type', {
                        is: 'Continuing Resource',
                        then: Yup.string().required('Required')
                    })
            })
        )
    })

    const handleSubmit = (values, {resetForm, setErrors}) => {
        const a = alert.show(`Submitting request...`);
        setIsSubmitting(true)
        return axios.post(
            `${API}request/`,
            values
        ).then(res => {
            const {data} = res;
            setIsSubmitting(false)
            emptyCart();
            resetForm();
            alert.show(`Request successful! Please check your mailbox for confirmation!`);
        }).catch((error) => {
            alert.remove(a)
            setIsSubmitting(false)
            setErrors(error.response.data)
        })
    }

    const getInitialValuesForItems = () => {
        return items.map(item => {
            item['volume'] = ''
            return item
        })
    }

    const initialValues = {
        card_number: '',
        email: '',
        request_date: '',
        items: getInitialValuesForItems()
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            { formik => (
            <Form>
                <div style={isMobile ? {display: "block"} : {display: 'flex'}}>
                    <div className={isMobile ? `${style.CartFormWrapper} ${style.Mobile}` : style.CartFormWrapper}>
                        <div className={style.Form}>
                            <Field
                                name="card_number"
                                label="Researcher Card Number"
                                disabled={isEmpty}
                                required={true}
                                component={InputField}
                            />
                            <Field
                                name="email"
                                label="Registered E-mail Address"
                                type="email"
                                disabled={isEmpty}
                                required={true}
                                component={InputField}
                            />
                            <DatePickerField
                                name={"request_date"}
                                label={"Request Date"}
                                filterDate={isWeekday}
                                disabled={isEmpty}
                                required={true}
                                minDate={new Date()}
                                maxDate={getMaxDate()}
                            />
                            {!isEmpty && <CaptchaField/>}
                            <div className={style.SubmitButtonWrapper}>
                                <button className={style.FormButton} type="submit" disabled={isEmpty || isSubmitting}>
                                    Send Request
                                </button>
                            </div>
                            <div className={style.Registration}>
                                <span>
                                  If you don't own a Researcher Identification Card, please register using the
                                  Research Registration form below.
                                </span>
                                {
                                    isMobile ?
                                    <div style={{textAlign: 'center'}}>
                                        <div>
                                            <a href={'/registration'}>
                                                <button className={style.FormButton} type="button">
                                                    Register
                                                </button>
                                            </a>
                                        </div>
                                        <div>
                                            <a href={'/forgot-card-number'}>
                                                <button className={`${style.FormButton} ${style.ForgotButton}`}
                                                        type="button">
                                                    Forgot card number
                                                </button>
                                            </a>
                                        </div>
                                    </div> :
                                    <div>
                                        <a href={'/registration'}>
                                            <button className={style.FormButton} type="button">
                                                Register
                                            </button>
                                        </a>
                                        <a href={'/forgot-card-number'}>
                                            <button className={`${style.FormButton} ${style.ForgotButton}`}
                                                    type="button">
                                                Forgot card number
                                            </button>
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <CartList isMobile={isMobile}/>
                </div>
            </Form>
            )}
        </Formik>
    )
}

export default CartForm;
