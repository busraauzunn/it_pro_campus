import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    EducationTermList,
    LessonList,
    LessonProgramList,
    LessonProgramListUnassigned,
    NewEducationTermForm,
    NewLessonForm,
    NewLessonProgramForm,
    PageHeader,
    Spacer,
} from "../../../components/components";
import { Tab, Tabs } from "react-bootstrap";

const LessonsPage = () => {
    const [tab, setTab] = useState("education");
    const { currentOperation } = useSelector((state) => state.misc);

    return (
        <>
            <PageHeader />
            <Spacer />
            <Tabs
                activeKey={tab}
                onSelect={(k) => setTab(k)}
                className="mb-3"
                fill={true}>
                <Tab title="Education Term" eventKey="education">
                    {currentOperation === "newEducationTerm" && (
                        <>
                            <Spacer />
                            <NewEducationTermForm />
                        </>
                    )}
                    <Spacer />
                    <EducationTermList />
                </Tab>
                <Tab title="Lessons" eventKey="lessons">
                    {currentOperation === "newLesson" && (
                        <>
                            <Spacer />
                            <NewLessonForm />
                        </>
                    )}
                    <Spacer />
                    <LessonList />
                </Tab>
                <Tab title="Lesson Program" eventKey="lesson-program">
                    {currentOperation === "newLessonProgram" && (
                        <>
                            <Spacer />
                            <NewLessonProgramForm />
                        </>
                    )}
                    <Spacer />
                    <LessonProgramList />
                    <Spacer />
                    <LessonProgramListUnassigned />
                </Tab>
            </Tabs>
            <Spacer />
        </>
    );
};

export default LessonsPage;
