import style from "./CaptchaField.module.scss";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useFormikContext} from "formik";

const CaptchaField = () => {
    const { setFieldValue, setFieldError, touched, errors } = useFormikContext();

    return (
        <div className={style.Captcha}>
            <HCaptcha
                onError={err => setFieldError("captcha", err)}
                onVerify={token => setFieldValue("captcha", token)}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
            />
            {
                errors['captcha'] &&
                <div className={style.Error}>{errors['captcha']}</div>
            }
        </div>
    )
}

export default CaptchaField;
