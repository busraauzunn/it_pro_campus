import React from "react";
import {
    LessonProgramListSelected,
    LessonProgramListUnselected,
    PageHeader,
    Spacer,
} from "../../../components/components";

const ChooseLessonPage = () => {
    return (
        <>
            <PageHeader />
            <Spacer />
            <LessonProgramListUnselected />
            <Spacer />
            <LessonProgramListSelected />
            <Spacer />
        </>
    );
};

export default ChooseLessonPage;
