import axios from "axios";
import * as Yup from "yup";

const API = process.env.NEXT_PUBLIC_AMS_API;

export const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    address_abroad: Yup.string().required('Required'),
    city_abroad: Yup.string().required('Required'),
    house_number: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    research_subject: Yup.string().required('Required'),
    captcha: Yup.string().required('Required!')
})

export const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    address_abroad: '',
    house_number: '',
    city_abroad: '',
    email: '',
    country: '',
    occupation: '',
    degree: '',
    research_subject: '',
}

export const submitData = (formData, actions, router, alert, setIsSubmitting) => {
    if (formData.hasOwnProperty('publish')) {
        formData['publish'] = formData['publish'] === 'Yes'
    }

    const submitting = alert.show('Submitting registration data...')

    setIsSubmitting(true)

    return axios.post(
        `${API}register-researcher/`,
        formData
    )
    .then(res => {
        const {data} = res
        alert.remove(submitting)
        alert.show(`Registration successful!`);
        actions.resetForm();
        setIsSubmitting(false)
    })
    .catch((error) => {
        const {status, statusText, data} = error.response
        setIsSubmitting(false)
        alert.remove(submitting)
        if (data && data.hasOwnProperty('message')) {
            alert.show(`${status} ${statusText} - ${data['message']}`);
        } else {
            if (data.hasOwnProperty('email')) {
                alert.show(
                  <div>
                      This e-mail address is already registered in our system!<br/>
                      If you forgot your Research Card Number, use the 'Forgot My Research Card Number' link.
                  </div>
                )
            } else {
                let message = []
                Object.keys(data).forEach(key => {
                    message.push(`${key}: ${data[key]}`)
                })
                alert.show(
                  <div>
                      The following fields are containing errors:<br/>
                      {
                          message.map(m => (
                            <div>{m}</div>
                          ))}
                  </div>
                )
            }
        }
    });
}
