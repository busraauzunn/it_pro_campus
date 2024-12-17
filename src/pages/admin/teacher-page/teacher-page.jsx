import React from "react";
import { useSelector } from "react-redux";
import {
    EditTeacherForm,
    NewTeacherForm,
    PageHeader,
    Spacer,
    TeacherList,
} from "../../../components/components";

const TeacherPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    const content = () => {
        switch (currentOperation) {
            case "newTeacher":
                return (
                    <>
                        <Spacer />
                        <NewTeacherForm />
                    </>
                );
            case "editTeacher":
                return (
                    <>
                        <Spacer />
                        <EditTeacherForm />
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <>
            <PageHeader />
            {content()}
            <Spacer />
            <TeacherList />
            <Spacer />
        </>
    );
};

export default TeacherPage;
