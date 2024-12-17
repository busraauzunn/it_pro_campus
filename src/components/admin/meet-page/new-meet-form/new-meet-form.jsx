import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { constants, functions, validations } from "../../../../helpers/helpers";
import { createMeet, getAllStudents } from "../../../../api/api";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import { ButtonSpinner } from "../../../components";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";

const NewMeetForm = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();

    const loadStudents = async () => {
        setLoading(true);
        try {
            const response = await getAllStudents();
            // const response = await getAllStudentsByAdvisorId();

            const studentsArray = response.data.map((item) => ({
                id: item.id,
                label: `${item.name} ${item.surname}`,
            }));

            setStudents(studentsArray);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const initialValues = {
        studentIds: [],
        date: "",
        description: "",
        startTime: "",
        stopTime: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        const payload = {
            ...values,
            studentIds: values.studentIds.map((item) => item.id),
        };

        try {
            await createMeet(payload);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast(
                "Meeting program has been added successfully",
                "success"
            );
        } catch (error) {
            console.log(error);
            functions.swalToast(
                "Something went wrong while adding meeting program",
                "error"
            );
        } finally {
            setLoading(false);
        }
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

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Meeting</Card.Title>
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
                                    optionValue="id"
                                    display="chip"
                                    placeholder="Select Students"
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
                                    {loading && <ButtonSpinner />} Create
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NewMeetForm;
