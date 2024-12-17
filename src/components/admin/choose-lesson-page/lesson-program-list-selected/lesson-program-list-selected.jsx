import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLessonProgramsByStudent } from "../../../../api/api";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const LessonProgramListSelected = () => {
    const [programList, setProgramList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { listRefreshToken } = useSelector((state) => state.misc);

    const loadProgramList = async () => {
        setLoading(true);
        try {
            const response = await getLessonProgramsByStudent();
            setProgramList(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const lessonNameTemplate = (row) => {
        return row.lessonName.map((item) => item.lessonName).join("-");
    };

    useEffect(() => {
        loadProgramList();
    }, [listRefreshToken]);

    return (
        <Container className="lesson-program-list-selected-container">
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                        Lesson Program List
                    </Card.Title>

                    <DataTable
                        value={programList}
                        dataKey="lessonProgramId"
                        loading={loading}
                        tableStyle={{ width: "100%" }}
                        stripedRows>
                        <Column
                            body={lessonNameTemplate}
                            header="Lesson Name"></Column>
                        <Column field="day" header="Day"></Column>
                        <Column field="startTime" header="Start Time"></Column>
                        <Column field="stopTime" header="Stop time"></Column>
                    </DataTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LessonProgramListSelected;
