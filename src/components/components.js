import img from "../images/profile.jpg";

const navLinks = [
    {
        className: "uil uil-estate",
        name: "Deshboard",
        sectionValue: "deshboard"
    },
    {
        className: "uil uil-laptop",
        name: "Tests",
        sectionValue: "tests"
    },
    {
        className: "uil uil-users-alt",
        name: "Students",
        sectionValue: "student"
    }
]

const deshboard = {
    className: "uil uil-tachometer-fast-alt",
    name: "Deshboard",
    activityClass: "uil uil-clock-two",
    activityName: "Recent Exam Held"
}


const boxes = [
    {
        boxClass: "box1",
        className: "uil uil-laptop",
        name: "Total Test",
        number: 5
    },
    {
        boxClass: "box2",
        className: "uil uil-user",
        name: "Total Student",
        number: 200
    },
    {
        boxClass: "box3",
        className: "uil uil-edit",
        name: "Total Result",
        number: 4
    }
]

const deshboardActivityData = {
    "Exam Name": {
        className: "names",
        childClass: "users-name",
        // values: ["Sessional 1", "Sessional 2", "Sessional 3", "Sessional 4", "Sessional 5"]
        values: []
    },
    "Dates": {
        className: "joined",
        childClass: "date",
        // values: ["16/05/24", "16/05/24", "06/05/24", "30/04/24", "22/04/24"]
        values: []
    },
    "Status": {
        className: "status",
        childClass: "view-btn",
        // values: ["Held", "Running", "Pending", "Held", "Held"]
        values: []
    }
}


const tests = {
    className: "uil uil-laptop",
    name: "Tests",
    activityClass: "uil uil-calender",
    activityName: "All Tests"
}

const testActivityData = {
    "Name": {
        className: "names",
        childClass: "",
        values: ["Sessional 1", "Sessional 2", "Sessional 3", "Sessional 4", "Sessional 5"]
    },
    "Tests Id": {
        className: "names",
        childClass: "",
        values: ["xxxx12", "xxxx13", "xxxx14", "xxxx15", "xxxx16"]
    },
    "Date": {
        className: "joined",
        childClass: "date",
        values: ["16/05/24", "16/05/24", "06/05/24", "30/04/24", "22/04/24"]
    },
    "Status": {
        className: "status",
        childClass: "",
        values: ["Pending", "Running", "Held", "Held", "Held"]
    },
    "Action":{
        className: "status",
        childClass: "view-btn",
        values: ['Edit Data', "Waiting...", "View Result", "View Result", "View Result"]
    }

}

const student = {
    className: "uil uil-tachometer-fast-alt",
    name: "Students",
    activityClass: "uil uil-users-alt",
    activityName: "All Avilable Students"
};


const studentActivityData = {
    "Student Name": {
        className: "names",
        childClass: "",
        values: [`Arjun Tripathi`, `Rahul Durgapal`, `Aniket Yadav`, `Amit Vishwakarma`]
    },
    "Email": {
        className: "emails",
        childClass: "email",
        values: ["arjun@gmail.com", "rahul@gmail.com", "aniket@gmail.como", "amit@outlook.com"]
    },
    "Status": {
        className: "status",
        childClass: "status",
        values: ["not attend", "not attend", "not attend", "not attend"]
    },
    "Result": {
        className: "status",
        childClass: "",
        values: ["View Result", "View Result", "View Result", "View Result"]
    }
};

const notification = {
    className: "uil uil-bell",
    name: "Notification",
    activityClass: "uil uil-calender",
    activityName: "Today"
}

const notificationData = [
    {
        name: "Arjun Tripathi",
        img: img,
        message: "Make a Inquiry",
        time: "08:30 AM"
    },
    {
        name: "Arjun Tripathi",
        img: img,
        message: "Have doubt in exam",
        time: "09:30 AM"
    },
    {
        name: "Arjun Tripathi",
        img: img,
        message: "Exam is completed",
        time: "10:30 AM"
    }
]

export { navLinks, deshboard, boxes, deshboardActivityData, tests, testActivityData, student, studentActivityData, notification, notificationData };