import React from "react";
import {
    EditStudentInfoForm,
    NewStudentInfoForm,
    PageHeader,
    Spacer,
    StudentInfoList,
} from "../../../components/components";
import { useSelector } from "react-redux";

const StudentInfoPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    const content = () => {
        switch (currentOperation) {
            case "newStudentInfo":
                return (
                    <>
                        <Spacer />
                        <NewStudentInfoForm />
                    </>
                );
            case "editStudentInfo":
                return (
                    <>
                        <Spacer />
                        <EditStudentInfoForm />
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
            <StudentInfoList />
            <Spacer />
        </>
    );
};

export default StudentInfoPage;
