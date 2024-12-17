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
import { ButtonSpinner } from "../../../components";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { constants, functions, validations } from "../../../../helpers/helpers";
import { MultiSelect } from "primereact/multiselect";
import { useFormik } from "formik";
import { getAllStudents, updateMeet } from "../../../../api/api";

const EditMeetForm = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const { currentRecord } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const initialValues = {
        ...currentRecord,
        studentIds: [],
    };

    const onSubmit = async (values) => {
        setLoading(true);

        const payload = {
            ...values,
            studentIds: values.studentIds.map((item) => item.id),
            startTime: functions.formatTime(values.startTime),
            stopTime: functions.formatTime(values.stopTime),
        };

        const meetId = payload.id;

        delete payload.id;
        delete payload.advisorTeacherId;
        delete payload.teacherName;
        delete payload.teacherSsn;
        delete payload.students;

        try {
            await updateMeet(meetId, payload);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast(
                "Meeting has been updated successfully!",
                "success"
            );
        } catch (error) {
            console.log(error);
            functions.swalToast(
                "There has been an error while submitting the meeting!",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const loadStudents = async () => {
        setLoading(true);
        try {
            const response = getAllStudents();

            const studentsArray = response.data.map((item) => ({
                id: item.id,
                label: `${item.name} ${item.surname} (${item.id})`,
            }));
            setStudents(studentsArray);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loadCurrentStudents = () => {
        const selectedStudents = currentRecord.students.map((item) =>
            item.id.toString()
        );
        console.log(selectedStudents);
        formik.setFieldValue("studentIds", selectedStudents);
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.newMeetFormValidationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    useEffect(() => {
        loadStudents();
    }, []);
    useEffect(() => {
        loadCurrentStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRecord]);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Update The Meeting</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col xs={12} lg={6} xxl={4}>
                                <MultiSelect
                                    value={formik.values.studentIds}
                                    onChange={(e) => {
                                        formik.setFieldValue(
                                            "studentIds",
                                            e.value
                                        );
                                    }}
                                    options={students}
                                    optionLabel="label"
                                    display="chip"
                                    placeholder="Select students"
                                    maxSelectedLabels={3}
                                    className="w-100 mb-3"
                                    style={{
                                        borderRadius: 0,
                                        paddingTop: "0.2rem",
                                        paddingBottom: "0.2rem",
                                    }}
                                />
                            </Col>

                            {constants.meetingFormContent.map((meeting) => (
                                <Col key={meeting._id} xs={12} lg={6} xxl={4}>
                                    <FloatingLabel
                                        controlId={meeting.name}
                                        label={`*${meeting.label}`}
                                        className="mb-3">
                                        <Form.Control
                                            type={meeting.type}
                                            as={meeting.as}
                                            {...formik.getFieldProps(
                                                meeting.name
                                            )}
                                            {...functions.checkFormikField(
                                                formik,
                                                meeting.name
                                            )}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[meeting.name]}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col className="text-end">
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={() =>
                                        dispatch(setCurrentOperation(null))
                                    }>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        !(formik.dirty && formik.isValid) ||
                                        loading
                                    }
                                    className="ms-3">
                                    {loading && <ButtonSpinner />} Update
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditMeetForm;
