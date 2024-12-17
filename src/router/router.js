import { createBrowserRouter } from "react-router-dom";
import {
    AboutPage,
    ContactPage,
    HomePage,
    AdminPage,
    ChooseLessonPage,
    ContactMessagesPage,
    CoursesPage,
    DashboardPage,
    DeanPage,
    EventsPage,
    GradesMeetsPage,
    LessonsPage,
    LoginPage,
    MeetPage,
    NotFoundPage,
    StudentInfoPage,
    StudentPage,
    TeacherPage,
    UnauthorizedPage,
    ViceDeanPage,
} from "../pages/pages";
import ProtectedRoute from "./protected-route";
import UserLayout from "../layouts/user-layout";

// Outlet = children

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "courses",
                element: <CoursesPage />,
            },
            {
                path: "events",
                element: <EventsPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "dashboard",
                children: [
                    {
                        index: true,
                        element: (
                            <ProtectedRoute
                                roles={[
                                    "ADMIN",
                                    "MANAGER",
                                    "ASSISTANTMANAGER",
                                    "TEACHER",
                                    "STUDENT",
                                ]}>
                                <DashboardPage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "admin-management",
                        element: (
                            <ProtectedRoute roles={["ADMIN"]}>
                                <AdminPage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "choose-lesson",
                        element: (
                            <ProtectedRoute roles={["STUDENT"]}>
                                <ChooseLessonPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "contact-messages",
                        element: (
                            <ProtectedRoute
                                roles={[
                                    "ADMIN",
                                    "MANAGER",
                                    "ASSISTANTMANAGER",
                                ]}>
                                <ContactMessagesPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "dean-management",
                        element: (
                            <ProtectedRoute roles={["ADMIN"]}>
                                <DeanPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "grade-and-meeting-management",
                        element: (
                            <ProtectedRoute roles={["STUDENT", "ADMIN"]}>
                                <GradesMeetsPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "lesson-management",
                        element: (
                            <ProtectedRoute
                                roles={["ADMIN", "ASSISTANTMANAGER"]}>
                                <LessonsPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "meet-management",
                        element: (
                            <ProtectedRoute roles={["ADMIN", "TEACHER"]}>
                                <MeetPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "student-info-management",
                        element: (
                            <ProtectedRoute roles={["ADMIN", "TEACHER"]}>
                                <StudentInfoPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "student-management",
                        element: (
                            <ProtectedRoute
                                roles={["ADMIN", "ASSISTANTMANAGER"]}>
                                <StudentPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "teacher-management",
                        element: (
                            <ProtectedRoute
                                roles={["ADMIN", "ASSISTANTMANAGER"]}>
                                <TeacherPage />,
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "vice-dean-management",
                        element: (
                            <ProtectedRoute roles={["ADMIN", "MANAGER"]}>
                                <ViceDeanPage />,
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

/* <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard">
                <Route index element={<DashboardPage />} />
                <Route path="admin-management" element={<AdminPage />} />
                <Route path="choose-lesson" element={<ChooseLessonPage />} />
                <Route
                    path="contact-messages"
                    element={<ContactMessagesPage />}
                />
                <Route path="dean-management" element={<DeanPage />} />
                <Route path="grades-meets" element={<GradesMeetsPage />} />
                <Route path="lessons-management" element={<LessonsPage />} />
                <Route path="meet-management" element={<MeetPage />} />
                <Route
                    path="student-info-management"
                    element={<StudentInfoPage />}
                />
                <Route path="student-management" element={<StudentPage />} />
                <Route path="teacher-management" element={<TeacherPage />} />
                <Route path="vice-dean-management" element={<ViceDeanPage />} />
            </Route>
        </Route>
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
</BrowserRouter>; */
