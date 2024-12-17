import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent, getAllAdvisorTeachers } from "../../../../api/api";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { constants, functions, validations } from "../../../../helpers/helpers";
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

const NewStudentForm = () => {
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        surname: "",
        email: "",
        gender: "",
        birthDay: "",
        birthPlace: "",
        phoneNumber: "",
        ssn: "",
        username: "",
        fatherName: "",
        motherName: "",
        password: "",
        confirmPassword: "",
        advisorTeacherId: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await createStudent(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Student created successfully", "success");
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

    const loadTeachers = async () => {
        try {
            const response = await getAllAdvisorTeachers();
            setTeachers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.studentFormValidationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    useEffect(() => {
        loadTeachers();
    }, []);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Create Student</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* OTHER FORM CONTENT */}
                            {constants.studentFormContent.map((content) => (
                                <Col key={content._id} xs={12} lg={6} xxl={4}>
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
                            ))}
                            {/* SELECT ADVISOR TEACHER */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="advisorTeacherId"
                                    label="*Advisor Teacher"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps(
                                            "advisorTeacherId"
                                        )}
                                        {...functions.checkFormikField(
                                            formik,
                                            "advisorTeacherId"
                                        )}>
                                        <option value="">
                                            Select Advisor Teacher
                                        </option>
                                        {teachers.map((teacher) => (
                                            <option
                                                value={teacher.advisorTeacherId}
                                                key={teacher.advisorTeacherId}>
                                                {teacher.teacherName}{" "}
                                                {teacher.teacherSurname}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.advisorTeacherId}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {/* SELECT GENDER */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="gender"
                                    label="Gender"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("gender")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "gender"
                                        )}>
                                        <option>Select gender</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.gender}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
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

export default NewStudentForm;
