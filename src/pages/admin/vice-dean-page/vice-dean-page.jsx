import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    EditViceDeanForm,
    NewViceDeanForm,
    PageHeader,
    Spacer,
    ViceDeanList,
} from "../../../components/components";

const ViceDeanPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    const content = () => {
        switch (currentOperation) {
            case "newViceDean":
                return (
                    <>
                        <Spacer />
                        <NewViceDeanForm />
                    </>
                );
            case "editViceDean":
                return (
                    <>
                        <Spacer />
                        <EditViceDeanForm />
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
            <ViceDeanList />
            <Spacer />
        </>
    );
};

export default ViceDeanPage;
