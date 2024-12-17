import React from "react";
import {
    GradesList,
    GradesMeetsList,
    PageHeader,
    Spacer,
} from "../../../components/components";

const GradesMeetsPage = () => {
    return (
        <>
            <PageHeader />
            <Spacer />
            <GradesList />
            <Spacer />
            <GradesMeetsList />
            <Spacer />
        </>
    );
};

export default GradesMeetsPage;
