import axios from "axios";
import * as Yup from "yup";

const API = process.env.NEXT_PUBLIC_AMS_API;

export const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    id_number: Yup.string().required('Required'),
    citizenship: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    occupation_type: Yup.string().required('Please select one occupation type'),
    agree_archival_materials_usage: Yup.boolean().oneOf([true], 'You should accept the conditions'),
    agree_researcher_statement: Yup.boolean().oneOf([true], "You should accept the researcher's statement"),
    captcha: Yup.string().required('Required!')
})

export const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    address_hun: '',
    city_hun: '',
    address: '',
    city: '',
    email: '',
    country: '',
    id_number: '',
    citizenship: '',
    occupation: '',
    occupation_type: 'student',
    degree: '',
    publish: 'no',
    agree_archival_materials_usage: false,
    agree_researcher_statement: false
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
