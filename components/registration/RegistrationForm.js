import { Field, Form, Formik } from 'formik';
import style from "./RegistrationForm.module.scss";
import InputField from "../form/InputField";
import * as Yup from 'yup';
import TextAreaField from "../form/TextAreaField";
import SelectField from "../form/SelectField";
import {degreeOptions} from "./options/degree";
import {occupationOptions, occupationTypeOptions} from "./options/occupation";
import {countries} from "./options/countries";
import RadioGroupField from "../form/RadioGroupField";
import {publishOptions} from "./options/publish";
import CheckboxField from "../form/CheckboxField";
import CaptchaField from "../form/CaptchaField";

const RegistrationForm = () => {
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        passport: Yup.string().required('Required'),
        citizenship: Yup.string().required('Required'),
        occupation: Yup.string().required('Required'),
        occupation_type: Yup.string().required('Please select one occupation type'),
        agree_archival_materials_usage: Yup.boolean().oneOf([true], 'You should accept the conditions'),
        agree_researcher_statement: Yup.boolean().oneOf([true], "You should accept the researcher's statement"),
        captcha: Yup.string().required('Required!')
    })

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        passport: '',
        citizenship: '',
        occupation: '',
        occupation_type: '',
        degree: '',
        publish: 'false',
        agree_archival_materials_usage: false,
        agree_researcher_statement: false
    }

    return (
        <div className={style.RegistrationFormWrapper}>
            <div className={style.Form}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                >
                    {() => (
                        <Form>
                            <div className={style.Column}>
                                <Field
                                    name="last_name"
                                    label="Last Name"
                                    required={true}
                                    component={InputField}
                                />
                                <Field
                                    name="first_name"
                                    label="First Name"
                                    required={true}
                                    component={InputField}
                                />
                                <Field
                                    name="middle_name"
                                    label="Middle Name"
                                    component={InputField}
                                />
                                <Field
                                    name="address_hun"
                                    label="Street"
                                    subLabel={'Address in Hungary'}
                                    component={InputField}
                                />
                                <Field
                                    name="city_hun"
                                    label="City"
                                    subLabel={'Address in Hungary'}
                                    component={InputField}
                                />
                                <Field
                                    name="address"
                                    label="Street"
                                    subLabel={'Address Abroad'}
                                    component={InputField}
                                />
                                <Field
                                    name="city"
                                    label="City"
                                    subLabel={'Address Abroad'}
                                    component={InputField}
                                />
                                <SelectField
                                    name="country"
                                    label="Country"
                                    subLabel={'Address Abroad'}
                                    selectOptions={countries}
                                    allowClear={true}
                                    labelProperty={'en_short_name'}
                                    valueProperty={'num_code'}
                                />
                            </div>
                            <div className={style.Column}>
                                <Field
                                    name="passport"
                                    label="Passport or ID No."
                                    required={true}
                                    component={InputField}
                                />
                                <Field
                                    name="email"
                                    label="E-Mail"
                                    required={true}
                                    component={InputField}
                                />
                                <SelectField
                                    name="citizenship"
                                    label="Citizenship"
                                    required={true}
                                    showSearch={true}
                                    optionFilterProp={'label'}
                                    selectOptions={countries}
                                    labelProperty={'nationality'}
                                    valueProperty={'num_code'}
                                />
                                <SelectField
                                    name="occupation"
                                    label="Occupation"
                                    required={true}
                                    selectOptions={occupationOptions}
                                />
                                <RadioGroupField
                                    name="occupation_type"
                                    options={occupationTypeOptions}
                                    direction={'vertical'}
                                />
                                <Field
                                    name="department"
                                    label="Department"
                                    component={InputField}
                                />
                                <Field
                                    name="employer"
                                    label="Employer or School"
                                    component={InputField}
                                />
                                <SelectField
                                    name="degree"
                                    label="Degree"
                                    selectOptions={degreeOptions}
                                />
                            </div>
                            <div className={style.Column}>
                                <Field
                                    name="research_subject"
                                    label="Research Subject"
                                    rows={6}
                                    component={TextAreaField}
                                />
                                <RadioGroupField
                                    name="publish"
                                    label={"Do you want to publish your research?"}
                                    options={publishOptions}
                                />
                                <Field
                                    name="tentative_date"
                                    label="If yes, tentative date?"
                                    component={InputField}
                                />
                                <CheckboxField
                                    name="agree_archival_materials_usage"
                                    fontSize={12}
                                >
                                    <span>
                                        By clicking this checkbox I understand, agree, and comply with the regulations
                                        for using archival materials at Blinken OSA.
                                    </span>
                                </CheckboxField>
                                <CheckboxField
                                    name="agree_researcher_statement"
                                    fontSize={12}
                                >
                                    <span>
                                        By clicking this checkbox I confirm that I have read, understand,
                                        and agree the content of the <a target={"_new"} href={"/researchers-statement"}>Researcher Statement</a>.
                                    </span>
                                </CheckboxField>
                                <div className={style.SubmitButtonWrapper}>
                                    <button type="submit">Register</button>
                                </div>
                                <CaptchaField />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegistrationForm;
