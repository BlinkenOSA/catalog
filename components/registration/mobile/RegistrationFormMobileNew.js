import {  Formik } from "formik";
import style from "./RegistrationFormMobileNew.module.scss";
import { initialValues, submitData, validationSchema } from "../registrationFuncitons";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

    const [acceptedSteps, { add, has }] = useSet(new Set([]));

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
                        values={values}
                        isSubmitting={isSubmitting}
                        canFillForm={canFillForm}
                    />
                )}
            </Formik>
        </div>
    )

    return (
        <div className={style.ContentWrapper}>
            {
                canFillForm ?
                    <div className={style.RegistrationFormWrapper} aria-disabled={!canFillForm}>
                        <div className={style.RegistrationFormWrapper}>
                            {renderForm()}
                        </div>
                    </div> :
                    <div className={style.Steps}>
                        <div className={style.Header}>
                            <Terms/>
                        </div>
                        <ul className={style.StepsList}>
                            <Steps addStep={add} hasStep={has} />
                        </ul>
                    </div>
            }
        </div>
    );
};

export default RegistrationFormNew;
