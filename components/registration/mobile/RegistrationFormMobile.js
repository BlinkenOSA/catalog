import { Field, Form, Formik } from 'formik';
import style from "./RegistrationFormMobile.module.scss";
import InputField from "../../form/InputField";
import TextAreaField from "../../form/TextAreaField";
import SelectField from "../../form/SelectField";
import RadioGroupField from "../../form/RadioGroupField";
import CheckboxField from "../../form/CheckboxField";
import CaptchaField from "../../form/CaptchaField";
import {initialValues, submitData, validationSchema} from "../registrationFuncitons";
import {occupationOptions, occupationTypeOptions, publishOptions} from "../options";
import {useAlert} from "react-alert";
import {useRouter} from "next/router";

const RegistrationFormMobile = () => {
    const alert = useAlert()
    const router = useRouter();

    return (
        <div className={style.RegistrationFormWrapper}>
            <div className={style.Form}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        submitData(values, actions, router, alert)
                    }}
                >
                    {() => (
                        <Form>
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
                                labelProperty={'country'}
                                valueProperty={'id'}
                            />
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
                                allowClear={true}
                                selectAPI={'research/degree/select/'}
                                labelProperty={'degree'}
                                valueProperty={'id'}
                            />
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
                            <div className={style.Captcha}>
                                <CaptchaField />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegistrationFormMobile;
