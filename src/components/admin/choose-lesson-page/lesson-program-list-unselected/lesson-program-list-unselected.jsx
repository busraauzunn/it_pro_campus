import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chooseLesson, getAllLessonPrograms } from "../../../../api/api";
import { functions } from "../../../../helpers/helpers";
import { setListRefreshToken } from "../../../../context/slices/misc-slices";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const LessonProgramListUnselected = () => {
    const [programList, setProgramList] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const loadProgramList = async () => {
        setLoading(true);
        try {
            const response = await getAllLessonPrograms();
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

    console.log(selectedPrograms);

    const handleSelect = async () => {
        const payload = {
            lessonProgramId: selectedPrograms.map((item) =>
                item.lessonProgramId.toString()
            ),
        };
        console.log(payload)

        try {
            await chooseLesson(payload);
            dispatch(setListRefreshToken(Math.random()));
        } catch (error) {
            console.log(error);
            functions.swalToast(error?.response?.data?.message, "error");
        }
    };

    useEffect(() => {
        loadProgramList();
    }, []);

    return (
        <Container className="lesson-program-list-unselected-container">
            <Card>
                <Card.Body>
                    <Card.Title>Choose Lesson</Card.Title>
                    <DataTable
                        value={programList}
                        dataKey="lessonProgramId"
                        loading={loading}
                        tableStyle={{ minWidth: "100%" }}
                        stripedRows
                        selection={selectedPrograms}
                        selectionMode="multiple"
                        onSelectionChange={(event) =>
                            setSelectedPrograms(event.value)
                        }>
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3rem" }}></Column>
                        <Column
                            body={lessonNameTemplate}
                            header="Lesson Name"></Column>
                        <Column field="teacher" header="Teacher"></Column>
                        <Column field="day" header="Day"></Column>
                        <Column field="startTime" header="Start Time"></Column>
                        <Column field="stopTime" header="Stop Time"></Column>
                    </DataTable>

                    <Row className="mt-3">
                        <Col className="text-center">
                            <Button
                                onClick={handleSelect}
                                disabled={selectedPrograms.length <= 0}>
                                SELECT
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LessonProgramListUnselected;
