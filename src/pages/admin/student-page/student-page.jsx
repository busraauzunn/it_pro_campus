import React from "react";
import {
    EditStudentForm,
    NewStudentForm,
    PageHeader,
    Spacer,
    StudentList,
} from "../../../components/components";
import { useSelector } from "react-redux";

const StudentPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    const content = () => {
        switch (currentOperation) {
            case "newStudent":
                return (
                    <>
                        <Spacer />
                        <NewStudentForm />
                    </>
                );
            case "editStudent":
                return (
                    <>
                        <Spacer />
                        <EditStudentForm />
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
            <StudentList />
            <Spacer />
        </>
    );
};

export default StudentPage;
