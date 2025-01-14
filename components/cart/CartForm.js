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
import ForgotCardNumberForm from "./ForgotCardNumberForm";
import TextAreaField from "../form/TextAreaField";

const API = process.env.NEXT_PUBLIC_AMS_API;

const CartList = dynamic(() => import('./CartList'), {
    ssr: false
})

const CartForm = ({isMobile = false}) => {
    const {isEmpty, items, emptyCart} = useCart();
    const alert = useAlert()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [forgotCardNumberShow, setForgotCardNumberShow] = useState(false)

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getMaxDate = () => {
        const d = new Date();
        return new Date(d.setMonth(d.getMonth() + 6))
    }

    const validationSchema = Yup.object().shape({
        card_number: Yup.number()
          .typeError('Card number must be a number')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        request_date: Yup.date().required('Required'),
        captcha: Yup.string().required('Required'),
        items: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                origin: Yup.string(),
                type: Yup.string(),
                restricted: Yup.boolean(),
                volume: Yup.string()
                    .when('primary_type', {
                        is: 'Continuing Resource',
                        then: Yup.string().required('Required')
                    })
            })
        ),
        research_subject: Yup.string()
          .when('items', {
              is: (items) => items.some((item) => item['restricted'] === true),
              then: Yup.string().required('Required'),
              otherwise: Yup.string().notRequired(),
          }),
        motivation: Yup.string()
          .when('items', {
              is: (items) => items.some((item) => item['restricted'] === true),
              then: Yup.string().required('Required'),
              otherwise: Yup.string().notRequired(),
          })
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

    const detectRestricted = () => {
        let restricted = false
        items.forEach(item => {
            if (item['restricted']) {
                restricted = true
            }
        })
        return restricted
    }

    const initialValues = {
        card_number: '',
        email: '',
        request_date: '',
        items: getInitialValuesForItems(),
        research_subject: '',
        motivation: ''
    }

    return (
        <>
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
                                { detectRestricted() &&
                                  <>
                                      <hr/>
                                      <div className={style.RestrictedInfo}>
                                          <div className={style.Label}>Restricted Content Information</div>
                                          <span>
                                              To facilitate the review process of your request to access restricted
                                              materials, please tell us more about the purpose of your research and,
                                              specifically, how you want to use the restricted document
                                              (max. 250 characters.)
                                          </span>
                                      </div>
                                      <Field
                                        name="research_subject"
                                        label="Research Subject"
                                        disabled={isEmpty}
                                        required={true}
                                        component={InputField}
                                      />
                                      <Field
                                        name="motivation"
                                        label="Motivation"
                                        required={true}
                                        disabled={isEmpty}
                                        rows={4}
                                        component={TextAreaField}
                                      />
                                      <hr/>
                                  </>
                                }
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
                                                <button className={`${style.FormButton} ${style.ForgotButton}`}
                                                        onClick={() => setForgotCardNumberShow(true)}
                                                        type="button">
                                                    Forgot card number
                                                </button>
                                            </div>
                                        </div> :
                                        <div>
                                            <a href={'/registration'}>
                                                <button className={style.FormButton} type="button">
                                                    Register
                                                </button>
                                            </a>
                                            <button className={`${style.FormButton} ${style.ForgotButton}`}
                                                    onClick={() => setForgotCardNumberShow(true)}
                                                    type="button">
                                                Forgot card number
                                            </button>
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
            <ForgotCardNumberForm
              isMobile={isMobile}
              open={forgotCardNumberShow}
              onClose={() => setForgotCardNumberShow(false)}/>
        </>
    )
}

export default CartForm;
