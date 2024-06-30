import "../css/tests.css";
import "../css/component.css";
import React, { useState, useEffect } from "react";
import { Title, ActivityData, Box, Popup, NewExamForm } from "./Components";
import { tests } from "./components";
import { getTestsList } from "../script/apis";
import { Loading } from "./Components";

export default function Tests(prps) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const [testActivityData, setTestActivityData] = useState({
        "Name": {
            className: "names", childClass: "", values: []
        },
        "Tests Id": {
            className: "names", childClass: "", values: []
        },
        "Date": {
            className: "joined", childClass: "date", values: []
        },
        "Status": {
            className: "status", childClass: "", values: []
        },
        "Action": {
            className: "status", childClass: "view-btn", values: []
        }
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllTests = async () => {
            setLoading(true);
            try {
                const response = await getTestsList();
                const transformedData = {
                    "Name": {
                        className: "names",
                        childClass: "",
                        values: response.map(test => test.test_name)
                    },
                    "Tests Id": {
                        className: "names",
                        childClass: "",
                        values: response.map(test => test.test_id)
                    },
                    "Date": {
                        className: "joined",
                        childClass: "date",
                        values: response.map(test => new Date(test.test_date).toLocaleDateString())
                    },
                    "Status": {
                        className: "status",
                        childClass: "",
                        values: response.map(test => {
                            const today = new Date().setHours(0, 0, 0, 0);
                            const testDate = new Date(test.test_date).setHours(0, 0, 0, 0);
                            if (testDate < today) {
                                return "Held";
                            } else if (testDate === today) {
                                return "Running";
                            } else {
                                return "Pending";
                            }
                        })
                    },
                    "Action": {
                        values: response.map(test => {
                            const today = new Date().setHours(0, 0, 0, 0);
                            const testDate = new Date(test.test_date).setHours(0, 0, 0, 0);
                            if (testDate < today) {
                                return "View Result";
                            } else if (testDate === today) {
                                return "Wating";
                            } else {
                                return "Edit";
                            }
                        })
                    }
                };
                setTestActivityData(transformedData);
            } catch (error) {
                console.error("Error fetching past tests:", error);
            } finally{
                setLoading(false);
            }
        }
        fetchAllTests();
    }, [])

    return (
        <>
            {loading && <Loading />}
            <div className="tests-content">
                <div className="overview">
                    <Title className={tests.className} name={tests.name} />
                    <div className="component-box">
                        <Box
                            boxClass=""
                            className="uil uil-plus"
                            name="Conduct New Exam"
                            number=""
                            onClick={togglePopup}
                        />
                    </div>
                    <div className="activity">
                        <div className="search-tools">
                            <Title className={tests.activityClass} name={tests.activityName} />
                            <div className="search">
                                <div style={{ color: "var(--text-color)" }}>
                                    Today:{" "}
                                    <input
                                        type="date"
                                        onMouseOver={(e) =>
                                            (e.target.value = new Date().toISOString().split("T")[0])
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <ActivityData className="activity-data" datas={testActivityData} />
                    </div>
                </div>
                <Popup show={isPopupOpen} onClose={togglePopup}>
                    <center>
                        <h2>Hi, Admin Name<br />Conduct New Exam</h2>
                        <p>lets conduct a New Exam we organized it carefully on our responsbility</p>
                    </center>
                    <NewExamForm />
                </Popup>
            </div>
        </>
    );
}
