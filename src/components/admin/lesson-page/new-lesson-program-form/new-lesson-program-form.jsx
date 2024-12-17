import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    createLessonProgram,
    getAllEducationTerms,
    getAllLessons,
} from "../../../../api/api";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import {
    data,
    functions,
    validations,
} from "../../../../helpers/helpers";
import { useFormik } from "formik";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { ButtonSpinner } from "../../../components";

const NewLessonProgramForm = () => {
    const [loading, setLoading] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [educationTerms, setEducationTerms] = useState([]);
    const dispatch = useDispatch();

    const initialValues = {
        lessonIdList: "",
        day: "",
        startTime: "",
        stopTime: "",
        educationTermId: "",
    };

    const loadLessons = async () => {
        try {
            const response = await getAllLessons();
            setLessons(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadEducationTerms = async () => {
        try {
            const response = await getAllEducationTerms();
            setEducationTerms(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(lessons);

    const onSubmit = async (values) => {
        setLoading(true);
        const payload = {
            ...values,
            lessonIdList: [values.lessonIdList],
        };
        console.log(payload);

        try {
            await createLessonProgram(payload);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast(
                "Lesson program created successfully",
                "success"
            );
        } catch (error) {
            console.log(error);
            functions.swalToast(
                "Something went wrong while adding the new lesson program",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.newLessonProgramFormValidationSchema,
        onSubmit,
    });

    useEffect(() => {
        loadLessons();
        loadEducationTerms();
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Lesson Program</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* LESSON ID LIST */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="lessonIdList"
                                    label="Select Lesson"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps(
                                            "lessonIdList"
                                        )}
                                        {...functions.checkFormikField(
                                            formik,
                                            "lessonIdList"
                                        )}>
                                        <option value="">
                                            Select a lesson...
                                        </option>
                                        {lessons.map((lesson) => (
                                            <option
                                                key={lesson.lessonId}
                                                value={lesson.lessonId}>
                                                {lesson.lessonName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.lessonIdList}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* EDUCATION TERM */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="educationTermId"
                                    label="Select Education Term"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps(
                                            "educationTermId"
                                        )}
                                        {...functions.checkFormikField(
                                            formik,
                                            "educationTermId"
                                        )}>
                                        <option value="">
                                            Select an education term...
                                        </option>
                                        {educationTerms.map((term) => (
                                            <option
                                                key={term.id}
                                                value={term.id}>
                                                {term.term}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.educationTermId}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* DAY */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="day"
                                    label="Select A Day"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("day")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "day"
                                        )}>
                                        <option value="">
                                            Select a day...
                                        </option>
                                        {data.days.map((day) => (
                                            <option
                                                key={day.value}
                                                value={day.value}>
                                                {day.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.day}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* START TIME */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="startTime"
                                    label="Start Time"
                                    className="mb-3">
                                    <Form.Control
                                        type="time"
                                        {...formik.getFieldProps("startTime")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "startTime"
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.startTime}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* END TIME */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="stopTime"
                                    label="End Time"
                                    className="mb-3">
                                    <Form.Control
                                        type="time"
                                        {...formik.getFieldProps("stopTime")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "stopTime"
                                        )}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stopTime}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
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

export default NewLessonProgramForm;
