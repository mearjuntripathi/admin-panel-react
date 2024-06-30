import React, { useEffect, useState } from "react";
import "../css/deshboard.css";
import { Title, Box, ActivityData } from "./Components";
import { deshboard, boxes } from "./components";
import { getPastTest } from "../script/apis";
import { Loading } from "./Components";

export default function Deshboard() { 
    const [deshboardActivityData, setDeshboardActivityData] = useState({
        "Exam Name": { className: "names", childClass: "users-name", values: [] },
        "Dates": { className: "joined", childClass: "date", values: [] },
        "Status": { className: "status", childClass: "view-btn", values: [] }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPastTests = async () => {
            setLoading(true);
            try {
                const response = await getPastTest();
                const transformedData = {
                    "Exam Name": {
                        className: "names",
                        childClass: "users-name",
                        values: response.map(test => test.test_name)
                    },
                    "Dates": {
                        className: "joined",
                        childClass: "date",
                        values: response.map(test => new Date(test.test_date).toLocaleDateString())
                    },
                    "Status": {
                        className: "status",
                        childClass: "view-btn",
                        values: response.map(() => "Held") // Assuming all are "Held" for simplicity
                    }
                };
                setDeshboardActivityData(transformedData);
            } catch (error) {
                console.error("Error fetching past tests:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchPastTests();
    }, []);

    return (
        <>
        {loading && <Loading />}
        <div className="dash-content">
            <div className="overview">
                <Title className={deshboard.className} name={deshboard.name} />
                <div className="boxes">
                    {boxes.map((box, index) => (
                        <Box key={index} boxClass={box.boxClass} className={box.className} name={box.name} number={box.number} />
                    ))}
                </div>
                <div className="activity">
                    <Title className={deshboard.activityClass} name={deshboard.activityName} />
                    <ActivityData className="activity-data" datas={deshboardActivityData} />
                </div>
            </div>
        </div>
        </>
    );
}
