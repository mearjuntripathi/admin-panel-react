import React, { useState } from "react";
import "../css/forgetPassword.css";
import { RequestOtp, ResetPassword } from "../components/Components";

export default function ForgetPassword(params) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    return <div className="main">
        <div className="container-box">
            {step === 1 && <RequestOtp setStep={setStep} setEmail={setEmail} />}
            {step === 2 && <ResetPassword email={email} />}
        </div>
    </div>
};