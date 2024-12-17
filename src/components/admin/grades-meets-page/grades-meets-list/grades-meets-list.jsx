import React, { useEffect, useState } from "react";
import { getAllMeetsByStudent } from "../../../../api/api";
import { functions } from "../../../../helpers/helpers";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const GradesMeetsList = () => {
    const [meetings, setMeetings] = useState();
    const [loading, setLoading] = useState(true);

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await getAllMeetsByStudent();
            setMeetings(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const startTimeTemplate = (row) => functions.formatTime(row?.startTime);
    const stopTimeTemplate = (row) => functions.formatTime(row?.stopTime);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Meeting List</Card.Title>
                    <DataTable
                        value={meetings}
                        dataKey="meetingId"
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows>
                        <Column field="date" header="Date"></Column>
                        <Column
                            body={startTimeTemplate}
                            header="Start Time"></Column>
                        <Column
                            body={stopTimeTemplate}
                            header="Stop Time"></Column>
                        <Column
                            field="description"
                            header="Description"></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default GradesMeetsList;
