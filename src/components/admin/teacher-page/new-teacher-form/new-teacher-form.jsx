import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTeacher, getAllLessonPrograms } from "../../../../api/api";
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
import { MultiSelect } from "primereact/multiselect";

const NewTeacherForm = () => {
    const [loading, setLoading] = useState(false);
    const [lessonPrograms, setLessonPrograms] = useState([]);
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
        password: "",
        confirmPassword: "",
        lessonsIdList: [],
        isAdvisorTeacher: false,
    };

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await createTeacher(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Teacher created successfully", "success");
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

    const loadLessonPrograms = async () => {
        try {
            const resp = await getAllLessonPrograms();
            const tempArr = resp.data.map((item) => {
                return {
                    lessonName: item.lessonName
                        .map((item) => item.lessonName)
                        .join("-"),
                    lessonProgramId: item.lessonProgramId,
                };
            });

            setLessonPrograms(tempArr);
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.teacherFormValidationSchema,
        onSubmit,
    });

    useEffect(() => {
        loadLessonPrograms();
    }, []);
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Create Teacher</Card.Title>
                    <Card.Text
                        style={{ fontSize: "12px" }}
                        className="fst-italic text-primary">
                        *Required Fields
                    </Card.Text>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {/* OTHER FORM CONTENT */}
                            {constants.teacherFormContent.map((content) => (
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
                            {/* SELECT LESSON PROGRAMS */}
                            <Col xs={12} lg={6} xxl={4}>
                                <MultiSelect
                                    value={formik.values.lessonsIdList}
                                    onChange={(e) => {
                                        formik.setFieldValue(
                                            "lessonsIdList",
                                            e.value
                                        );
                                    }}
                                    options={lessonPrograms}
                                    optionLabel="lessonName"
                                    display="chip"
                                    placeholder="Select Lessons"
                                    maxSelectedLabels={3}
                                    className="w-100"
                                    style={{
                                        borderRadius: 0,
                                        paddingTop: "0.2rem",
                                        paddingBottom: "0.2rem",
                                        marginBottom: "1rem",
                                    }}
                                />
                            </Col>
                            {/* IS ADVISOR TEACHER */}
                            <Col xs={12} lg={6} xxl={4}>
                                <Form.Check
                                    inline
                                    label="Advisor Teacher"
                                    type="checkbox"
                                    {...formik.getFieldProps(
                                        "isAdvisorTeacher"
                                    )}
                                />
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

export default NewTeacherForm;
