import "../css/notification.css";
import React from "react";
import { Title, NotificationData } from "./Components";
import { notification, notificationData } from "./components";

export default function Notification(props) {
    return <div className="notification-content">
        <div className="overview">
            <Title className={notification.className} name={notification.name} />
        </div>
        <div className="activity">
            <div className="search-tools">
                <Title className={notification.activityClass} name={notification.activityName} />
                <div className="search">
                    <div style={{ color: "var(--text-color)" }}>
                        Today: <input type="date" onMouseOver={(e) => e.target.value = new Date().toISOString().split('T')[0]} /> {/* Corrected the event and scope issue */}
                    </div>
                </div>
            </div>
            <NotificationData data={notificationData} />
        </div>
    </div>
}