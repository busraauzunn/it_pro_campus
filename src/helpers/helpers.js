import { config } from "./config/config";
import courses from "./data/courses.json";
import days from "./data/days.json";
import educationTerms from "./data/education-terms.json";
import events from "./data/events.json";
import instructors from "./data/instructors.json";
import slider from "./data/slider.json";
import userMenu from "./data/user-menu.json";
import { swalQuestion, swalToast } from "./functions/sweetalert";
import { formatTime, getCurrentDate } from "./functions/date-time";
import { checkFormikField } from "./functions/forms";
import {
    encryptedLocalStorage,
    encryptedSessionStorage,
} from "./storage/encrypted-storage";
import {
    adminFormContent,
    deanFormContent,
    educationTermFormContent,
    meetingFormContent,
    lessonFormContent,
    studentInforFormContent,
    studentFormContent,
    teacherFormContent,
    viceDeanForm,
} from "./constants/constants";
import {
    newDeanFormValidationSchema,
    newEducationTermFormValidationSchema,
    newLessonFormValidationSchema,
    newLessonProgramFormValidationSchema,
    newMeetFormValidationSchema,
    studentInfoFormValidationSchema,
    studentFormValidationSchema,
    teacherFormValidationSchema,
} from "./validations/validations";
import api from "./axios/interceptors";

export const data = {
    courses,
    days,
    educationTerms,
    events,
    instructors,
    slider,
    userMenu,
};

export const functions = {
    checkFormikField,
    formatTime,
    getCurrentDate,
    swalQuestion,
    swalToast,
};

export { config, encryptedLocalStorage, encryptedSessionStorage, api };

export const constants = {
    adminFormContent,
    deanFormContent,
    educationTermFormContent,
    meetingFormContent,
    lessonFormContent,
    studentInforFormContent,
    studentFormContent,
    teacherFormContent,
    viceDeanForm,
};

export const validations = {
    newDeanFormValidationSchema,
    newEducationTermFormValidationSchema,
    newLessonFormValidationSchema,
    newLessonProgramFormValidationSchema,
    newMeetFormValidationSchema,
    studentInfoFormValidationSchema,
    studentFormValidationSchema,
    teacherFormValidationSchema,
};
