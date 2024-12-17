import React, { useState } from "react";
import { constants, functions, validations } from "../../../../helpers/helpers";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { createDean } from "../../../../api/api";
import { ButtonSpinner } from "../../../components";

const NewDeanForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        birthDay: "",
        birthPlace: "",
        confirmPassword: "",
        gender: "",
        name: "",
        password: "",
        phoneNumber: "",
        ssn: "",
        surname: "",
        username: "",
    };

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await createDean(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Dean created successfully", "success");
        } catch (error) {
            console.log(error);
            functions.swalToast(
                Object.values(error?.reeponse?.data?.validations),
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.newDeanFormValidationSchema,
        onSubmit,
    });

    return (
        <Container className="new-dean-form-container">
            <Card>
                <Card.Body>
                    <Card.Title>Add New Dean</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {constants.deanFormContent.map((item) => (
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
                                            autoComplete={item.autoComplete}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[item.name]}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            ))}
                            {/* GENDER */}
                            <Col xs={12} lg={6} xxl={4}>
                                <FloatingLabel
                                    controlId="gender"
                                    label="*Gender"
                                    className="mb-3">
                                    <Form.Select
                                        {...formik.getFieldProps("gender")}
                                        {...functions.checkFormikField(
                                            formik,
                                            "gender"
                                        )}>
                                        <option>Select Gender</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                        <option value="NOTSPECIFIED">
                                            Don't Want to Specify
                                        </option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.gender}
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

export default NewDeanForm;
