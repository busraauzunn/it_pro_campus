import * as Yup from "yup";

export const newDeanFormValidationSchema = Yup.object({
    birthDay: Yup.date().required("Enter your birth date"),
    birthPlace: Yup.string().required("Enter the place of your birth"),
    confirmPassword: Yup.string()
        .required("Confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    gender: Yup.string()
        .required("Please select your gender")
        .oneOf(["MALE", "FEMALE", "NOTSPECIFIED"], "You must select a gender"),
    name: Yup.string().required("Enter your first name"),
    password: Yup.string()
        .required("Enter your password")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /[a-z]+/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /[A-Z]+/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/\d+/, "Password must contain at least one number"),
    phoneNumber: Yup.string()
        .required("Enter your phone number")
        .matches(
            /\d{3}-\d{3}-\d{4}/g,
            "Phone number must be in format XXX-XXX-XXXX"
        ),
    ssn: Yup.string()
        .required("Enter your SSN")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN must be in format XXX-XX-XXXX"),
    surname: Yup.string().required("Enter your last name"),
    username: Yup.string().required("Enter your username"),
});

export const newEducationTermFormValidationSchema = Yup.object({
    term: Yup.string()
        .required("Enter the term")
        .oneOf(["SPRING_SEMESTER", "FALL_SEMESTER"], "Select a term"),
    startDate: Yup.date().required("Select the start date"),
    endDate: Yup.date().required("Select the end date"),
    lastRegistrationDate: Yup.date().required(
        "Select the last registration date"
    ),
});

export const newLessonFormValidationSchema = Yup.object({
    lessonName: Yup.string().required("Enter the lesson name").min(2, "At least 2 characters"),
    creditScore: Yup.number().required("Enter the credit score"),
});

export const newLessonProgramFormValidationSchema = Yup.object({
    lessonIdList: Yup.string().required("Select the lesson"),
    day: Yup.string().required("Select the day"),
    startTime: Yup.string().required("Select the start time"),
    stopTime: Yup.string().required("Select the stop time"),
    educationTermId: Yup.string().required("Select the education term"),
});

export const newMeetFormValidationSchema = Yup.object({
    studentIds: Yup.array().required("Select at least a student"),
    date: Yup.date().required("Select a date"),
    description: Yup.string()
        .required("Enter a description")
        .min(2, "At least 2 characters")
        .max(16, "Max 16 characters"),
    startTime: Yup.string().required("Select the time"),
    stopTime: Yup.string().required("Select the time"),
});

export const studentInfoFormValidationSchema = Yup.object({
    lessonId: Yup.string().required("Select lesson"),
    studentId: Yup.string().required("Select student"),
    educationTermId: Yup.string().required("Select education term"),
    absentee: Yup.number().required("Enter absentee count in days"),
    midtermExam: Yup.number().required("Enter midterm exam result"),
    finalExam: Yup.number().required("Enter final exam result"),
    infoNote: Yup.string().required("Enter info note"),
});

export const studentFormValidationSchema = Yup.object({
    name: Yup.string().required("Enter your first name"),
    surname: Yup.string().required("Enter your last name"),
    email: Yup.string()
        .email("Enter a valid email")
        .required("Enter your email"),
    gender: Yup.string()
        .required("Select your gender")
        .oneOf(["MALE", "FEMALE"], "Select your gender"),
    advisorTeacherId: Yup.string().required("Select a advisor teacher"),
    motherName: Yup.string().required("Enter mother name"),
    fatherName: Yup.string().required("Enter father name"),
    birthDay: Yup.date().required("Enter your birth date"),
    birthPlace: Yup.string().required("Enter your place of birth"),
    phoneNumber: Yup.string()
        .required("Enter your phone number")
        .matches(/\d{3}-\d{3}-\d{4}/g, "Phone number is not valid"),
    ssn: Yup.string()
        .required("Enter your ssn")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN is not valid"),
    username: Yup.string().required("Enter your username"),
    password: Yup.string()
        .required("Enter your password")
        .min(8, "At least 8 characters")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
        .required("Please re-enter your password")
        .oneOf([Yup.ref("password")], "Password fields doesn't match"),
});

export const teacherFormValidationSchema = Yup.object({
    name: Yup.string().required("Enter your first name"),
    surname: Yup.string().required("Enter your last name"),
    email: Yup.string()
        .email("Enter a valid email")
        .required("Enter your email"),
    gender: Yup.string()
        .required("Select your gender")
        .oneOf(["MALE", "FEMALE"], "Select your gender"),
    lessonsIdList: Yup.array().required("Select at least a lesson"),
    birthDay: Yup.date().required("Enter your birth date"),
    birthPlace: Yup.string().required("Enter your place of birth"),
    phoneNumber: Yup.string()
        .required("Enter your phone number")
        .matches(/\d{3}-\d{3}-\d{4}/g, "Phone number is not valid"),
    ssn: Yup.string()
        .required("Enter your ssn")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN is not valid"),
    username: Yup.string().required("Enter your username"),
    password: Yup.string()
        .required("Enter your password")
        .min(8, "At least 8 characters")
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
        .required("Please re-enter your password")
        .oneOf([Yup.ref("password")], "Password fields doesn't match"),
});
