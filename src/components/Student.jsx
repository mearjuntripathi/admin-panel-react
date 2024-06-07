import "../css/student.css";
import React, { useState } from "react";
import { Title, ActivityData } from "./Components";
import { student } from "./components";
import { getStudents } from "../script/apis";

export default function Student(props) {
    const [testId, setTestId] = useState('');
    const [studentActivityData, setStudentActivityData] = useState({
        "Student Name": {
            className: "names",
            childClass: "name",
            values: []
        },
        "Email": {
            className: "emails",
            childClass: "email",
            values: []
        },
        "Status": {
            className: "status",
            childClass: "status",
            values: []
        },
        "Score": {
            className: "value",
            childClass: "score",
            values: []
        },
        "Result": {
            className: "status",
            childClass: "",
            values: []
        }
    });

    const handleInputChange = (e) => {
        setTestId(e.target.value);
    };

    const fetchAllStudents = async () => {
        try {
            const response = await getStudents(testId);

            const transformedData = {
                "Student Name": {
                    className: "names",
                    childClass: "name",
                    values: response.map(student => student.name)
                },
                "Email": {
                    className: "emails",
                    childClass: "email",
                    values: response.map(student => student.email)
                },
                "Status": {
                    className: "status",
                    childClass: "status",
                    values: response.map(student => student.status)
                },
                "Score": {
                    className: "value",
                    childClass: "score",
                    values: response.map(student => student.score)
                },
                "Result": {
                    className: "status",
                    childClass: "",
                    values: response.map(student => "View Result")
                }
            };

            setStudentActivityData(transformedData);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };


    const handleButtonClick = () => {
        fetchAllStudents();
    };

    return (
        <div className="students-content">
            <div className="overview">
                <Title className={student.className} name={student.name} />
                <div className="boxes">
                    <div className="search-tools">
                        <div className="search">
                            <div className="input">
                                <input
                                    type="text"
                                    id="test-id"
                                    placeholder="Enter Test Id To view Student . . ."
                                    value={testId}
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleButtonClick}>
                                    <i className="uil uil-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="activity">
                    <Title className={student.activityClass} name={student.activityName} />
                    <ActivityData className="activity-data" datas={studentActivityData} />
                </div>
            </div>
        </div>
    );
}
