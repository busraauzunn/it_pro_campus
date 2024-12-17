import React from "react";
import {
    Instructors,
    PageHeader,
    Spacer,
    Welcome,
} from "../../../components/components";

const AboutPage = () => {
    return (
        <>
            <PageHeader />
            <Spacer />
            <Welcome />
            <Spacer />
            <Instructors />
            <Spacer />
        </>
    );
};

export default AboutPage;
