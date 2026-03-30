import {Field, Form} from "formik";
import InputField from "../../form/InputField";
import SelectField from "../../form/SelectField";
import {occupationOptions} from "../options";
import TextAreaField from "../../form/TextAreaField";
import CaptchaField from "../../form/CaptchaField";
import React from "react";
import style from "./RegistrationFormFields.module.scss";

const RegistrationFormFields = ({canFillForm, isSubmitting, values}) => {
    return (
        <Form aria-disabled={!canFillForm}>
            <div className={style.Column}>
                <Field
                    name="last_name"
                    label="Last Name"
                    required={true}
                    component={InputField}
                    disabled={!canFillForm}
                />
                <Field
                    name="first_name"
                    label="First Name"
                    required={true}
                    component={InputField}
                    disabled={!canFillForm}
                />
                <Field
                    name="middle_name"
                    label="Middle Name"
                    component={InputField}
                    disabled={!canFillForm}
                />
                <Field
                    name="email"
                    label="E-Mail"
                    required={true}
                    component={InputField}
                    disabled={!canFillForm}
                />
                <SelectField
                    name="country"
                    label="Country"
                    selectAPI={'research/country/select/'}
                    allowClear={true}
                    showSearch={true}
                    required={true}
                    optionFilterProp={'label'}
                    labelProperty={'country'}
                    valueProperty={'id'}
                    disabled={!canFillForm}
                />
                <Field
                    name="city_abroad"
                    label="City"
                    required={true}
                    subLabel={'Address'}
                    component={InputField}
                    disabled={!canFillForm}
                />
                <Field
                    name="address_abroad"
                    label="Street"
                    required={true}
                    subLabel={'Address'}
                    component={InputField}
                    disabled={!canFillForm}
                />
                <Field
                    name="house_number"
                    label="House No."
                    required={true}
                    component={InputField}
                    subLabel={'Address'}
                    disabled={!canFillForm}
                />
                <SelectField
                    name="occupation"
                    label="Current Affiliation / Employer"
                    subLabel={"If you are not affiliated with CEU, choose 'Other'."}
                    required={true}
                    selectOptions={occupationOptions}
                    disabled={!canFillForm}
                />
                {
                    (values['occupation'] === 'ceu_student' ||  values['occupation'] === 'ceu_faculty') && (
                        <Field
                            name="department"
                            label="Department"
                            component={InputField}
                            disabled={!canFillForm}
                            required={true}
                        />
                    )
                }
                {
                    values['occupation'] === 'ceu_student' &&
                        <SelectField
                            name="degree"
                            label="Current Degree / Course"
                            selectAPI={'research/degree/select/'}
                            labelProperty={'degree'}
                            valueProperty={'id'}
                            disabled={!canFillForm}
                            required={true}
                        />
                }
                {
                    values['occupation'] === 'other' && (
                        <Field
                            name="employer_or_school"
                            label="Institution / Position / Independent researcher"
                            component={InputField}
                            disabled={!canFillForm}
                            required={true}
                        />)
                }
                <Field
                    name="research_subject"
                    label="Research Subject"
                    rows={4}
                    required={true}
                    component={TextAreaField}
                    disabled={!canFillForm}
                />
                <div className={style.SubmitButtonWrapper}>
                    <button type="submit" disabled={isSubmitting || !canFillForm}>Register</button>
                </div>
                {canFillForm && <CaptchaField />}
            </div>
        </Form>
    )
}

export default RegistrationFormFields;