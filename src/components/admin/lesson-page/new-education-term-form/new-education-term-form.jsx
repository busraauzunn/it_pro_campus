import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    constants,
    data,
    functions,
    validations,
} from "../../../../helpers/helpers";
import { createEducationTerm } from "../../../../api/api";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
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

const NewEducationTermForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        term: "",
        startDate: "",
        endDate: "",
        lastRegistrationDate: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        console.log(values);
        try {
            await createEducationTerm(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast(
                "Education term created successfully",
                "success"
            );
        } catch (error) {
            console.log(error);
            functions.swalToast(
                "Something went wrong while adding the new education term",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.newEducationTermFormValidationSchema,
        onSubmit,
    });

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Education Term</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="term"
                                    label="Education Term"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("term")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "term"
                                        )}>
                                        <option>Select a term</option>
                                        {data.educationTerms.map((term) => (
                                            <option
                                                key={term.value}
                                                value={term.value}>
                                                {term.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.term}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            {constants.educationTermFormContent.map((item) => (
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

export default NewEducationTermForm;
