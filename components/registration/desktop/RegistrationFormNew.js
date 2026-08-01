import { Formik } from "formik";
import style from "./RegistrationFormNew.module.scss";
import { initialValues, submitData, validationSchema } from "../registrationFuncitons";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Terms from "../parts/Terms";
import {useSet} from "react-use";
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
                        Please accept all terms and conditions to unlock the form.
                    </div>
                )}
                {renderForm()}
            </div>
        </div>
    );
};

export default RegistrationFormNew;
