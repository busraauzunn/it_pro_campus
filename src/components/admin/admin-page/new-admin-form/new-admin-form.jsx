import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Card,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { functions } from "../../../../helpers/helpers";
import { ButtonSpinner } from "../../../components";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { createAdmin } from "../../../../api/api";
import { constants } from "../../../../helpers/helpers";

const NewAdminForm = () => {
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

    const validationSchema = Yup.object({
        birthDay: Yup.date().required("Enter your birth date"),
        birthPlace: Yup.string().required("Enter the place of your birth"),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        gender: Yup.string()
            .required("Please select your gender")
            .oneOf(
                ["MALE", "FEMALE", "NOTSPECIFIED"],
                "You must select a gender"
            ),
        name: Yup.string().required("Enter your first name"),
        password: Yup.string()
            .required("Enter your password")
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /[a-z]+/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[A-Z]+/,
                "Password must contain at least one uppercase letter"
            )
            .matches(/\d+/, "Password must contain at least one number"),
        phoneNumber: Yup.string()
            .required("Enter your phone number")
            .matches(
                /\d{3}-\d{3}-\d{4}/g,
                "Phone number must be in format XXX-XXX-XXXX"
            ),
        ssn: Yup.string()
            .required("Enter your SSN")
            .matches(/\d{3}-\d{2}-\d{4}/g, "SSN must be in format XXX-XX-XXXX"),
        surname: Yup.string().required("Enter your last name"),
        username: Yup.string().required("Enter your username"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await createAdmin(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Admin created successfully!", "success");
        } catch (error) {
            console.log(error);
            // TODO: error messages coming as object might need to be fixed
            functions.swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Add New Admin</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {constants.adminFormContent.map((item) => (
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
                                        <option
                                            value="SELECTGENDER"
                                            disabled
                                            selected>
                                            Select Gender
                                        </option>
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

export default NewAdminForm;
