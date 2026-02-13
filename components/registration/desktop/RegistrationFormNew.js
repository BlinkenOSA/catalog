import { Field, Form, Formik } from "formik";
import style from "./RegistrationFormNew.module.scss";
import InputField from "../../form/InputField";
import TextAreaField from "../../form/TextAreaField";
import SelectField from "../../form/SelectField";
import RadioGroupField from "../../form/RadioGroupField";
import CaptchaField from "../../form/CaptchaField";
import { initialValues, submitData, validationSchema } from "../registrationFuncitons";
import {occupationOptions, occupationTypeOptions, publishOptions} from "../options";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import Terms from "../parts/Terms";
import RequestAndUse from "../parts/RequestAndUse";
import Restrictions from "../parts/Restrictions";
import ReproductionAndReUse from "../parts/ReproductionAndReUse";
import Disclaimer from "../parts/Disclaimer";
import PrivacyPolicy from "../parts/PrivacyPolicy";
import {useList, useSet} from "react-use";
import RegistrationFormFields from "../parts/RegistrationFormFields";
import Steps from "../parts/Steps";

const RegistrationFormNew = () => {
    const alert = useAlert();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [acceptedSteps, {add, has}] = useSet(new Set([]));

    const canFillForm = acceptedSteps.size === 5;

    const renderForm = () => (
        <div className={style.Form}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    submitData(values, actions, router, alert, setIsSubmitting)
                }}
            >
                {({values}) => (
                    <RegistrationFormFields
                        canFillForm={canFillForm}
                        values={values}
                        isSubmitting={isSubmitting}
                    />
                )}
            </Formik>
        </div>
    )

    return (
        <div className={style.ContentWrapper}>
            <div className={style.Steps}>
                <div className={style.Header}>
                    <Terms/>
                </div>
                <ul className={style.StepsList}>
                    <Steps addStep={add} hasStep={has}/>
                </ul>
            </div>
            <div className={style.RegistrationFormWrapper} aria-disabled={!canFillForm}>
                {!canFillForm && (
                    <div className={style.FormLockedNote}>
                        Please accept all the steps to unlock the form.
                    </div>
                )}
                {renderForm()}
            </div>
        </div>
    );
};

export default RegistrationFormNew;
