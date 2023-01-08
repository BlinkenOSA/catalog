import axios from "axios";
import {API} from "../../utils/fetcherFunctions";
import * as Yup from "yup";

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

export const submitData = (formData, actions, router, alert) => {
    if (formData.hasOwnProperty('publish')) {
        formData['publish'] = formData['publish'] === 'Yes'
    }

    return axios.post(
        `${API}register-researcher/`,
        formData
    )
    .then(res => {
        const {data} = res
        alert.show(`${data['message']}`);
        setTimeout(function () {
            router.push('/requests')
        }, 3000);
    })
    .catch((error) => {
        const {status, statusText, data} = error.response
        if (data && data.hasOwnProperty('message')) {
            alert.show(`${status} ${statusText} - ${data['message']}`);
        } else {
            if (data.hasOwnProperty('email')) {
                alert.show(`This e-mail address is already registered in our system!`)
            } else {
                let message = []
                Object.keys(data).forEach(key => {
                    message.push(`${key}: ${data[key]}`)
                })
                alert.show(
                    <span>
                    The following fields are containing errors:<br/>
                        {message.join('\n')}
                </span>
                )
            }
        }
    });
}
