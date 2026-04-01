import style from "./CaptchaField.module.scss";
import { useFormikContext } from "formik";
import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const ReCaptchaField = () => {
    const { setFieldValue, setFieldError, errors } = useFormikContext();

    return (
        <div className={style.Captcha}>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => setFieldValue("captcha", token || "")}
                onExpired={() => setFieldValue("captcha", "")}
                onErrored={() => setFieldError("captcha", "Captcha failed. Please try again.")}
            />
            {errors["captcha"] && <div className={style.Error}>{errors["captcha"]}</div>}
        </div>
    );
};

export default ReCaptchaField;
