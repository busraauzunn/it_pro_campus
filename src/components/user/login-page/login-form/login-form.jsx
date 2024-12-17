import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { ButtonSpinner, PasswordInput } from "../../../components";
import * as Yup from "yup";
import { checkFormikField } from "../../../../helpers/functions/forms";
import { Link, useNavigate } from "react-router-dom";
import * as API from "../../../../api/api";
import { encryptedLocalStorage, functions } from "../../../../helpers/helpers";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../../context/slices/auth-slices";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required!"),
        password: Yup.string().required("Password is required!"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const responseAuth = await API.login(values);
            encryptedLocalStorage.setItem("token", responseAuth.data.token);
            const responseUser = await API.getUser();
            // const responseUserJson = await fetch(
            //     "https://mycampusmates.com/app/user/me",
            //     {
            //         method: "GET",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: responseAuth.data.token,
            //         },
            //     }
            // );
            // const responseUser = await responseUserJson.json();
            // console.log(responseUser);
            dispatch(login(responseUser.data));
            functions.swalToast("You have successfully logged in!", "success");
            navigate("/dashboard");
        } catch (error) {
            dispatch(logout());
            functions.swalToast(error.response.data.message, "error");
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
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="border-3 border-primary border">
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mt-md-4 mb-3">
                                    <p className="mb-4">
                                        <em>
                                            Please enter your email address and
                                            password to login!
                                        </em>
                                    </p>
                                    <div className="mb-3">
                                        <Form
                                            noValidate
                                            onSubmit={formik.handleSubmit}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="username">
                                                <Form.Label>
                                                    Username
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter username"
                                                    {...formik.getFieldProps(
                                                        "username"
                                                    )}
                                                    {...checkFormikField(
                                                        formik,
                                                        "username"
                                                    )}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.username}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="password">
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <PasswordInput
                                                    {...formik.getFieldProps(
                                                        "password"
                                                    )}
                                                    error={
                                                        formik.errors.password
                                                    }
                                                    {...checkFormikField(
                                                        formik,
                                                        "password"
                                                    )}
                                                    placeholder="Enter password"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <p className="small">
                                                    <Link to="/forgot-password">
                                                        Forgot password?
                                                    </Link>
                                                </p>
                                            </Form.Group>
                                            <Form.Group>
                                                <Button
                                                    type="submit"
                                                    className="w-100"
                                                    disabled={loading}>
                                                    {loading && (
                                                        <ButtonSpinner />
                                                    )}{" "}
                                                    Login
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
