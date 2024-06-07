import "../css/component.css"
import { useState } from "react";
import { sendOTP, updatePassword, createTest } from "../script/apis";

function Preloader() {
    return (<div id="preloader">
        <div className="jumper">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>);
};

function Logo({ img, name }) {
    return (<div className="logo-name">
        <div className="logo-image">
            <img src={img} alt={name} />
        </div>
        <span className="logo_name">{name}</span>
    </div>);
}

function Navitem({ className, name, onClick }) {
    return (<li onClick={onClick}>
        <a id="">
            <i className={className}></i>
            <span className="link-name">{name}</span>
        </a>
    </li>);
}

function Panel({ img, sidebarToggle }) {
    return <div className="top">
        <i className="uil uil-bars sidebar-toggle" onClick={sidebarToggle}></i>

        <div className="search-box">
            <i className="uil uil-search"></i>
            <input type="text" placeholder="Search here . . ." />
        </div>
        <img src={img} alt="" />
    </div>
}

const DarkModeToggle = ({ mode }) => {
    return <>
        <a id="" onclick="">
            <i className={mode ? "uil uil-moon" : "uil uil-sun"}></i>
            <span className="link-name">{mode ? "Dark Mode" : "Light Mode"}</span>
        </a>
        <div className="mode-toggle">
            <span className="switch"></span>
        </div>
    </>
};

const Box = (props) => {
    return <div className={"box " + props.boxClass} onClick={props?.onClick}>
        <i className={props.className}></i>
        <span class="text">{props.name}</span>
        <span className="number">{props.number}</span>
    </div>;
};

const Title = (props) => {
    return <div className="title">
        <i className={props.className}></i>
        <span className="text">{props.name}</span>
    </div>;
}

// Data component
const Data = (props) => {
    return (
        <div className={"data " + props.className}>
            <span className="data-title">{props.title}</span>
            {props.children}
        </div>
    );
};

// DataList component
const DataList = (props) => {
    return (
        <span className={"data-list " + props.className}>
            {props.children}
        </span>
    );
};

const ActivityData = (props) => {
    const { className, datas } = props;
    // Check if datas is empty or values array is empty in all objects
    const isEmpty = !datas || Object.keys(datas).length === 0 || Object.values(datas).every(data => data.values.length === 0);

    if (isEmpty) {
        return <div className="empty" >No data available</div>;
    }
    return <div className={className}>
        {Object.entries(datas).map(([title, { className, childClass, values }]) => (
            <Data key={title} title={title} className={className}>
                {values.map((item, index) => (
                    <DataList key={index} className={childClass}>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                    </DataList>
                ))}
            </Data>
        ))}
    </div>
}

const NotificationData = (props) => {
    const notifications = props.data;
    return <div className="notification-data">
        {notifications.map((notification) => (
            <div className="notify">
                <div className="info">
                    <img src={notification.img} alt="" />
                    <p className="name">{notification.name}</p>
                    <p className="message">{notification.message}</p>
                </div>
                <p className="time">{notification.time}</p>
            </div>
        ))}
    </div>
}

const Popup = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

const NewExamForm = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // Get today's date
    const today = new Date();
    // Increment by one day to get the next date
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 1);
    // Format the date to YYYY-MM-DD
    const formattedNextDate = nextDate.toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await createTest(formData);
            setMessage(`Form submission successful. Link to fill the form: ${response.test_link}`);
            setError('');
        } catch (error) {
            setError(error);
            setMessage('');
        }
    }

    return (
        <>
            <div className="response">
                {message ? <p className="message">{message}</p> : null}
                {error ? <p className="error">{error}</p> : null}
            </div>
            <br />
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="">Test Name:</label>
                    <input type="text" placeholder="Enter Test Name" name="test_name" required />
                </div>
                <div className="input">
                    <label htmlFor="">Upload CSV file of questios and answer:</label>
                    <input type="file" placeholder="Upload a CSV File for question answer" name="csv-file" required />
                </div>
                <div className="input">
                    <label htmlFor="">Set Timing of Exam:</label>
                    <input type="number" placeholder="Enter timing in minute" name="test_timing" required />
                </div>
                <div className="input">
                    <label htmlFor="">Set Date when Held Exam:</label>
                    <input type="date" min={formattedNextDate} name="test_date" required />
                </div>
                <button type="submit">Set Exam</button>
            </form>
        </>
    );
}


const RequestOtp = ({ setStep, setEmail }) => {
    const [email, setEmailInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendOTP(email);
            setEmail(email);
            setStep(2);
        } catch (error) {
            setError('Email does not exist');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="box">
            <h2>Forget Password</h2>
            <br />
            {error && <div id='message' className="message"><p>{error}</p></div>}
            <div className="inputs">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Send OTP</button>

        </form>
    );
};

const ResetPassword = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePassword(email, otp, password);
            setSuccess(response);
            setError('');
        } catch (error) {
            setError(error);
            setSuccess('');
        }
    };

    function togglePassword() {
        const icon = document.getElementById('icon');
        const password = document.getElementById('password');
        if (icon && password) {
            icon.classList.toggle('uil-eye');
            icon.classList.toggle('uil-eye-slash');
            password.type = password.type === 'password' ? 'text' : 'password';
        }
    }

    return (
        <form onSubmit={handleSubmit} className="box">
            <h2>Reset Password</h2>
            <br />
            {error && <div className="message"><p>{error}</p></div>}
            {success && <div className="smessage"><p>{success}</p></div>}
            <div className="inputs">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                /></div>
            <div className="inputs">
                <i className="uil uil-lock" id="icon" onClick={togglePassword}></i>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /></div>
            <button type="submit">Reset Password</button>
        </form>
    );
};

export { Preloader, Logo, Navitem, DarkModeToggle, Panel, Box, Title, ActivityData, NotificationData, Popup, NewExamForm, RequestOtp, ResetPassword };