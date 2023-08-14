import { Field, Form, Formik } from 'formik';
import style from "./RegistrationForm.module.scss";
import InputField from "../../form/InputField";
import TextAreaField from "../../form/TextAreaField";
import SelectField from "../../form/SelectField";
import RadioGroupField from "../../form/RadioGroupField";
import CheckboxField from "../../form/CheckboxField";
import CaptchaField from "../../form/CaptchaField";
import {initialValues, submitData, validationSchema} from "../registrationFuncitons";
import {howDoYouKnowOptions, occupationOptions, occupationTypeOptions, publishOptions} from "../options";
import {useAlert} from "react-alert";
import {useRouter} from "next/router";
import * as Yup from "yup";

const validation = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  agree_archival_materials_usage: Yup.boolean().oneOf([true], 'You should accept the conditions'),
  agree_researcher_statement: Yup.boolean().oneOf([true], "You should accept the researcher's statement"),
})

const RegistrationForm = () => {
    const alert = useAlert()
    const router = useRouter();

    return (
        <div className={style.RegistrationFormWrapper}>
            <div className={style.Form}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={(values, actions) => {
                      submitData(values, actions, router, alert)
                    }}
                >
                    {({values}) => (
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
                                    selectAPI={'research/country/select/'}
                                    allowClear={true}
                                    showSearch={true}
                                    optionFilterProp={'label'}
                                    labelProperty={'country'}
                                    valueProperty={'id'}
                                />
                            </div>
                            <div className={style.Column}>
                                <Field
                                    name="id_number"
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
                                    selectAPI={'research/nationality/select'}
                                    labelProperty={'nationality'}
                                    valueProperty={'id'}
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
                                    selectAPI={'research/degree/select/'}
                                    labelProperty={'degree'}
                                    valueProperty={'id'}
                                />
                            </div>
                            <div className={style.Column}>
                                <Field
                                    name="research_subject"
                                    label="Research Subject"
                                    rows={4}
                                    component={TextAreaField}
                                />
                                <RadioGroupField
                                    name="publish"
                                    label={"Do you want to publish your research?"}
                                    options={publishOptions}
                                />
                                <SelectField
                                    name="how_do_you_know_osa"
                                    label="How do you know OSA?"
                                    required={false}
                                    selectOptions={howDoYouKnowOptions}
                                />
                                {
                                    values['how_do_you_know_osa'] === 'other' &&
                                    <Field
                                        name="how_do_you_know_osa_other"
                                        label="How do you know OSA? (Other)"
                                        rows={4}
                                        component={TextAreaField}
                                    />
                                }
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
                                <a href={'/forgot-card-number'}>
                                  <div className={style.SubmitButtonWrapper} style={{marginTop: '10px'}}>
                                    <button type="button" className={style.ForgotButton} >Forgot Card Number</button>
                                  </div>
                                </a>
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
