// ADMIN SERVICES
import { getAdminsByPage, deleteAdmin, createAdmin } from "./admins/admins";
// ADVISOR TEACHER SERVICES
import { getAllAdvisorTeachers } from "./advisor-teacher/advisor-teacher";

// AUTH SERVICES
import { login, getUser } from "./auth/auth";

// CONTACT SERVICES
import {
    createMessage,
    getAllContactMessagesByPage,
} from "./contact-messages/contact-messages";
// DEAN SERVICES
import {
    getDeansByPage,
    deleteDean,
    createDean,
    updateDean,
} from "./dean/dean";

// EDUCATION TERMS SERVICES
import {
    getAllEducationTerms,
    createEducationTerm,
    deleteEducationTerm,
    getEducationTermsByPage,
} from "./education-terms/education-terms";

// LESSON PROGRAMS SERVICES
import {
    createLessonProgram,
    deleteLessonProgram,
    getAllLessonPrograms,
    getLessonProgramsByStudent,
    getLessonProgramsByTeacher,
    updateLessonProgram,
    getAllUnAssignedLessonPrograms,
    getLessonProgramsByPage,
} from "./lesson-programs/lesson-programs";
// LESSONS SERVICES
import {
    createLesson,
    deleteLesson,
    getAllLessons,
    getLessonsByPage,
    updateLesson,
} from "./lessons/lessons";

// MEETS SERVICES
import {
    createMeet,
    deleteMeet,
    getAllMeetsByStudent,
    getMeetsByPage,
    updateMeet,
} from "./meets/meets";

// STUDENT INFO SERVICES
import {
    createStudentInfo,
    deleteStudentInfo,
    getAllStudentInfo,
    getAllStudentInfoForStudentByPage,
    getAllStudentInfoForTeacherByPage,
    updateStudentInfo,
} from "./student-info/student-info";

// STUDENT SERVICES
import {
    chooseLesson,
    createStudent,
    deleteStudent,
    getAllStudents,
    getAllStudentsByAdvisorId,
    getStudentById,
    getStudentsByPage,
    updateStudent,
} from "./students/students";

// TEACHER SERVICES
import {
    chooseLessonTeacher,
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getTeacherById,
    getTeachersByPage,
    updateTeacher,
} from "./teachers/teachers";

// VICE DEAN SERVICES
import {
    createViceDean,
    deleteViceDean,
    getViceDeansByPage,
    updateViceDean,
} from "./vice-deans/vice-deans";

export {
    // ADMIN SERVICES
    createAdmin,
    deleteAdmin,
    getAdminsByPage,

    // ADVISOR TEACHER SERVICES
    getAllAdvisorTeachers,

    // AUTH SERVICES
    getUser,
    login,

    // CONTACT SERVICES
    createMessage,
    getAllContactMessagesByPage,

    // DEAN SERVICES
    createDean,
    deleteDean,
    getDeansByPage,
    updateDean,

    // EDUCATION TERMS SERVICES
    createEducationTerm,
    deleteEducationTerm,
    getAllEducationTerms,
    getEducationTermsByPage,

    // LESSON PROGRAMS SERVICES
    createLessonProgram,
    deleteLessonProgram,
    getAllLessonPrograms,
    getAllUnAssignedLessonPrograms,
    getLessonProgramsByPage,
    getLessonProgramsByStudent,
    getLessonProgramsByTeacher,
    updateLessonProgram,

    // LESSONS SERVICES
    createLesson,
    deleteLesson,
    getAllLessons,
    getLessonsByPage,
    updateLesson,

    // MEETS SERVICES
    createMeet,
    deleteMeet,
    getAllMeetsByStudent,
    getMeetsByPage,
    updateMeet,

    // STUDENT INFO SERVICES
    createStudentInfo,
    deleteStudentInfo,
    getAllStudentInfo,
    getAllStudentInfoForStudentByPage,
    getAllStudentInfoForTeacherByPage,
    updateStudentInfo,

    // STUDENT SERVICES
    chooseLesson,
    createStudent,
    deleteStudent,
    getAllStudents,
    getAllStudentsByAdvisorId,
    getStudentById,
    getStudentsByPage,
    updateStudent,

    // TEACHER SERVICES
    chooseLessonTeacher,
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getTeacherById,
    getTeachersByPage,
    updateTeacher,

    // VICE DEAN SERVICES
    createViceDean,
    deleteViceDean,
    getViceDeansByPage,
    updateViceDean,
};
