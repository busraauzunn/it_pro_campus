import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setListRefreshToken } from "../../../../context/slices/misc-slices";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { functions } from "../../../../helpers/helpers";
import {
    chooseLesson,
    getAllTeachers,
    getAllUnAssignedLessonPrograms,
} from "../../../../api/api";

const LessonProgramListUnassigned = () => {
    const [programList, setProgramList] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [loading, setLoading] = useState(false);

    const { listRefreshToken } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const loadProgramList = async () => {
        setLoading(true);
        try {
            const response = await getAllUnAssignedLessonPrograms();
            setProgramList(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadTeachers = async () => {
        setLoading(true);
        try {
            const response = await getAllTeachers();
            setTeachers(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!selectedProgram)
                throw Error("Please select a lesson program.");
            if (!selectedTeacher)
                throw Error("Please select a teacher to assign.");

            const payload = {
                lessonProgramId: [selectedProgram.lessonProgramId.toString()],
                teacherId: selectedTeacher,
            };

            await chooseLesson(payload);
            dispatch(setListRefreshToken(Math.random()));
            functions.swalToast(
                "Lesson program assigned successfully.",
                "success"
            );
        } catch (error) {
            console.log(error);
            const errorMessage =
                error?.message ||
                "There was an error assigning the lesson program.";
            functions.swalToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };
    const lessonNameTemplate = (row) =>
        row.lessonName.map((item) => item.lessonName).join("-");

    useEffect(() => {
        loadProgramList();
        loadTeachers();
    }, [listRefreshToken]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                        Lesson Program Assignment
                    </Card.Title>

                    <DataTable
                        value={programList}
                        lazy
                        dataKey="lessonProgramId"
                        loading={loading}
                        tableStyle={{ minWidth: "50rem", fontSize: "0.9rem" }}
                        stripedRows
                        selectionMode="single"
                        selection={selectedProgram}
                        onSelectionChange={(e) => setSelectedProgram(e.value)}>
                        <Column
                            selectionMode="single"
                            headerStyle={{ width: "3rem" }}></Column>
                        <Column
                            header="Lesson Name"
                            body={lessonNameTemplate}></Column>
                        <Column header="Day" field="day"></Column>
                        <Column header="Start Time" field="startTime"></Column>
                        <Column header="Stop Time" field="stopTime"></Column>
                    </DataTable>

                    <Row className="mt-3">
                        <Col className="d-flex align-items-stretch gap-2">
                            <FloatingLabel
                                controlId="teacherId"
                                label="Select Teacher"
                                className="flex-grow-1">
                                <Form.Select
                                    onChange={(e) =>
                                        setSelectedTeacher(e.target.value)
                                    }>
                                    <option value="">Select Teacher</option>
                                    {teachers.map((teacher) => (
                                        <option
                                            key={teacher.userId}
                                            value={teacher.userId}>
                                            {teacher.name}
                                            {teacher.surname}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                            <Button className="px-4" onClick={handleSubmit}>
                                Assign
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LessonProgramListUnassigned;
