export const adminFormContent = [
    {
        _id: 1,
        label: "First Name",
        name: "name",
        type: "text",
        autoComplete: "given-name",
    },
    {
        _id: 2,
        label: "Last Name",
        name: "surname",
        type: "text",
        autoComplete: "family-name",
    },
    {
        _id: 3,
        label: "Birth Date",
        name: "birthDay",
        type: "date",
        autoComplete: "bday",
    },
    {
        _id: 4,
        label: "Birth Place",
        name: "birthPlace",
        type: "text",
        autoComplete: "off",
    },
    {
        _id: 5,
        label: "SSN (XXX-XX-XXXX)",
        name: "ssn",
        type: "text",
        autoComplete: "off",
    },
    {
        _id: 6,
        label: "Phone Number (XXX-XXX-XXXX)",
        name: "phoneNumber",
        type: "text",
        autoComplete: "tel-national",
    },
    {
        _id: 7,
        label: "Username",
        name: "username",
        type: "text",
        autoComplete: "username",
    },
    {
        _id: 8,
        label: "Password",
        name: "password",
        type: "text",
        autoComplete: "new-password",
    },
    {
        _id: 9,
        label: "Confirm Password",
        name: "confirmPassword",
        type: "text",
        autoComplete: "new-password",
    },
];

export const deanFormContent = [...adminFormContent];

export const studentInforFormContent = [
    {
        _id: 1,
        label: "Absentee",
        name: "absentee",
        type: "number",
        autoComplete: "off",
    },
    {
        _id: 2,
        label: "Midterm Exam",
        name: "midtermExam",
        type: "number",
        autoComplete: "off",
    },
    {
        _id: 3,
        label: "Final Exam",
        name: "finalExam",
        type: "number",
        autoComplete: "off",
    },
    {
        _id: 4,
        label: "Note",
        name: "infoNote",
        type: "text",
        autoComplete: "off",
    },
];

export const educationTermFormContent = [
    {
        _id: 1,
        label: "Start Date",
        name: "startDate",
        type: "date",
        autoComplete: "off",
    },
    {
        _id: 2,
        label: "End Date",
        name: "endDate",
        type: "date",
        autoComplete: "off",
    },
    {
        _id: 3,
        label: "Last Registration Date",
        name: "lastRegistrationDate",
        type: "date",
        autoComplete: "off",
    },
];

export const studentFormContent = [
    ...adminFormContent,
    {
        _id: 10,
        label: "Email",
        name: "email",
        type: "email",
        autoComplete: "email",
    },
    {
        _id: 11,
        label: "Mother Name",
        name: "motherName",
        type: "text",
        autoComplete: "off",
    },
    {
        _id: 12,
        label: "Father Name",
        name: "fatherName",
        type: "text",
        autoComplete: "off",
    },
];

export const teacherFormContent = [
    ...adminFormContent,
    {
        _id: 10,
        label: "Email",
        name: "email",
        type: "email",
        autoComplete: "email",
    },
];

export const viceDeanForm = [...adminFormContent];

export const lessonFormContent = [
    {
        _id: 1,
        label: "Lesson Name",
        name: "lessonName",
        type: "text",
        autoComplete: "off",
    },
    {
        _id: 2,
        label: "Credit Score",
        name: "creditScore",
        type: "number",
        autoComplete: "off",
    },
];

export const meetingFormContent = [
    {
        _id: 1,
        label: "Date",
        name: "date",
        type: "date",
        autoComplete: "off",
    },
    {
        _id: 2,
        label: "Start Time",
        name: "startTime",
        type: "time",
        autoComplete: "off",
    },
    {
        _id: 3,
        label: "Stop Time",
        name: "stopTime",
        type: "time",
        autoComplete: "off",
    },
    {
        _id: 4,
        label: "Description",
        name: "description",
        type: "text",
        as: "textarea",
        autoComplete: "off",
    },
];
