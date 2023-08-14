import { Field, Form, Formik } from 'formik';
import style from "./CartForm.module.scss";
import InputField from "../form/InputField";
import DatePickerField from "../form/DatePickerField";
import * as Yup from 'yup';
import {useCart} from "react-use-cart";
import CaptchaField from "../form/CaptchaField";

const CartForm = ({isMobile=false}) => {
    const { isEmpty } = useCart();

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
        captcha: Yup.date().required('Required')
    })

    return (
        <div className={isMobile ? `${style.CartFormWrapper} ${style.Mobile}` : style.CartFormWrapper}>
            <div className={style.Form}>
                <Formik
                    initialValues={{ card_number: '', email: '', request_date: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {({errors, touched}) => (
                        <Form>
                            <Field
                                name="card_number"
                                label="Researcher Identification Card Number"
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
