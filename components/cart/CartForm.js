import { Field, Form, Formik } from 'formik';
import style from "./CartForm.module.scss";
import InputField from "../form/InputField";
import DatePickerField from "../form/DatePickerField";
import * as Yup from 'yup';
import {useCart} from "react-use-cart";
import CaptchaField from "../form/CaptchaField";
import axios from "axios";
import {useAlert} from "react-alert";

const API = process.env.NEXT_PUBLIC_AMS_API;

const CartForm = ({isMobile=false}) => {
    const { isEmpty, items } = useCart();
    const alert = useAlert()

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
        captcha: Yup.string().required('Required')
    })

    const handleSubmit = (values, actions) => {
        values['items'] = items
        return axios.post(
          `${API}request/`,
          values
        ).then(res => {
          const {data} = res
          alert.show(`Request successful!`);
        })
    }

    return (
        <div className={isMobile ? `${style.CartFormWrapper} ${style.Mobile}` : style.CartFormWrapper}>
            <div className={style.Form}>
                <Formik
                    initialValues={{ card_number: '', email: '', request_date: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({errors, touched}) => (
                        <Form>
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
                            {!isEmpty && <CaptchaField />}
                            <div className={style.SubmitButtonWrapper}>
                                <button className={style.FormButton} type="submit" disabled={isEmpty}>
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
                                                <button className={`${style.FormButton} ${style.ForgotButton}`} type="button">
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
                                            <button className={`${style.FormButton} ${style.ForgotButton}`} type="button">
                                                Forgot card number
                                            </button>
                                        </a>
                                    </div>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default CartForm;
