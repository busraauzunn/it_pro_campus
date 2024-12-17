import React, { useState } from "react";
import { constants, functions, validations } from "../../../../helpers/helpers";
import { useDispatch } from "react-redux";
import { createLesson } from "../../../../api/api";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
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

const NewLessonForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        lessonName: "",
        compulsory: "",
        creditScore: "",
        lastRegistrationDate: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        console.log(values);
        try {
            await createLesson(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Lesson created successfully", "success");
        } catch (error) {
            console.log(error);
            functions.swalToast(
                "Something went wrong while adding the new lesson",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.newLessonFormValidationSchema,
        onSubmit,
    });
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Lesson</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {constants.lessonFormContent.map((item) => (
                                <Col xs={12} lg={6} xxl={4} key={item._id}>
                                    <FloatingLabel
                                        controlId={item.name}
                                        label={`*${item.label}`}
                                        className="mb-3">
                                        <Form.Control
                                            type={item.type}
                                            {...formik.getFieldProps(item.name)}
                                            {...functions.checkFormikField(
                                                formik,
                                                item.name
                                            )}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[item.name]}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            ))}
                            <Col xs={12} lg={6} xxl={4}>
                                <Form.Check
                                    inline
                                    label="Compulsory"
                                    type="checkbox"
                                    {...formik.getFieldProps("compulsory")}
                                />
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

export default NewLessonForm;
