import React from "react";
import {
    FeaturedCourses,
    MobileApp,
    Slider,
    Spacer,
    UpcomingEvents,
    Welcome,
} from "../../../components/components";

const HomePage = () => {
    return (
        <>
            <Slider />
            <Spacer />
            <Welcome />
            <Spacer />
            <FeaturedCourses />
            <Spacer />
            <UpcomingEvents />
            <Spacer height={50} />
            <MobileApp />
        </>
    );
};

export default HomePage;
