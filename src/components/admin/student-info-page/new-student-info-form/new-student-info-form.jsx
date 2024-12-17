import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { constants, functions, validations } from "../../../../helpers/helpers";
import {
    createStudentInfo,
    getAllEducationTerms,
    getAllLessons,
    getAllStudents,
} from "../../../../api/api";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import {
    Card,
    Col,
    Container,
    FloatingLabel,
    Row,
    Form,
    Button,
} from "react-bootstrap";
import { ButtonSpinner } from "../../../components";

const NewStudentInfoForm = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [educationTerms, setEducationTerms] = useState([]);
    const dispatch = useDispatch();

    const initialValues = {
        lessonId: "",
        studentId: "",
        educationTermId: "",
        absentee: "",
        midtermExam: "",
        finalExam: "",
        infoNote: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await createStudentInfo(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast(
                "Student information created successfully",
                "success"
            );
        } catch (error) {
            console.log(error);
            const errorMessage = Object.values(
                error?.response?.data?.validations
            )[0];
            functions.swalToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    const loadStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
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

    const formik = useFormik({
        initialValues,
        validationSchema: validations.studentInfoFormValidationSchema,
        onSubmit,
    });

    useEffect(() => {
        loadStudents();
        loadLessons();
        loadEducationTerms();
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Student Information</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* SELECT LESSON */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="lessonId"
                                    label="*Select Lesson"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("lessonId")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "lessonId"
                                        )}>
                                        <option>Select Lesson</option>
                                        {lessons.map((item) => (
                                            <option
                                                value={item.lessonId}
                                                key={item.lessonId}>
                                                {item.lessonName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.lessonId}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* SELECT STUDENT */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="studentId"
                                    label="*Select Student"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("studentId")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "studentId"
                                        )}>
                                        <option>Select Lesson</option>
                                        {students.map((item) => (
                                            <option
                                                value={item.id}
                                                key={item.id}>
                                                {item.name} {item.surname}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.studentId}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* SELECT EDUCATION TERM */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="educationTermId"
                                    label="*Select Education Term"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps(
                                            "educationTermId"
                                        )}
                                        {...functions.checkFormikField(
                                            formik,
                                            "educationTermId"
                                        )}>
                                        <option>Select Education Term</option>
                                        {educationTerms.map((item) => (
                                            <option
                                                value={item.id}
                                                key={item.id}>
                                                {item.term}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.educationTermId}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* OTHER FORM CONTENT */}
                            {constants.studentInforFormContent.map(
                                (content) => (
                                    <Col
                                        key={content._id}
                                        xs={12}
                                        lg={6}
                                        xxl={4}>
                                        <FloatingLabel
                                            controlId={content.name}
                                            label={`*${content.label}`}
                                            className="mb-3">
                                            <Form.Control
                                                type={content.type}
                                                as={content.as}
                                                {...formik.getFieldProps(
                                                    content.name
                                                )}
                                                {...functions.checkFormikField(
                                                    formik,
                                                    content.name
                                                )}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors[content.name]}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                )
                            )}
                        </Row>
                        {/* BUTTONS */}
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

export default NewStudentInfoForm;
