import React from "react";
import {
    EditMeetForm,
    MeetList,
    NewMeetForm,
    PageHeader,
    Spacer,
} from "../../../components/components";
import { useSelector } from "react-redux";

const MeetPage = () => {
    const { currentOperation } = useSelector((state) => state.misc);

    return (
        <>
            <PageHeader />
            {currentOperation === "newMeeting" && (
                <>
                    <Spacer />
                    <NewMeetForm />
                </>
            )}
            {currentOperation === "editMeeting" && (
                <>
                    <Spacer />
                    <EditMeetForm />
                </>
            )}
            <Spacer />
            <MeetList />
            <Spacer />
        </>
    );
};

export default MeetPage;
