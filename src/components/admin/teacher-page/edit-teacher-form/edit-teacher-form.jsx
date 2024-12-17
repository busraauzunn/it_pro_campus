import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants, functions, validations } from "../../../../helpers/helpers";
import {
    getAllLessonPrograms,
    getTeacherById,
    updateTeacher,
} from "../../../../api/api";
import { useFormik } from "formik";
import {
    setCurrentOperation,
    setListRefreshToken,
} from "../../../../context/slices/misc-slices";
import { ButtonSpinner } from "../../../components";
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

const EditTeacherForm = () => {
    const [loading, setLoading] = useState(false);
    const [lessonPrograms, setLessonPrograms] = useState([]);
    const { currentRecord } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const initialValues = {
        ...currentRecord,
        password: "",
        confirmPassword: "",
        lessonsIdList: [],
    };

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await updateTeacher(values);
            formik.resetForm();
            dispatch(setListRefreshToken(Math.random()));
            dispatch(setCurrentOperation(null));
            functions.swalToast("Teacher updated successfully", "success");
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
            const respLessonPrograms = await getAllLessonPrograms();
            const respTeacher = await getTeacherById(currentRecord.userId);

            const arrLessonPrograms = respLessonPrograms.data.map((item) => ({
                id: item.lessonProgramId.toString(),
                label: item.lessonName.map((item) => item.lessonName).join("-"),
            }));

            setLessonPrograms(arrLessonPrograms);

            const lessonsIdLists =
                respTeacher.data.object.lessonsProgramList.map((item) =>
                    item.id.toString()
                );

            formik.setFieldValue("lessonsIdList", lessonsIdLists);
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validations.teacherFormValidationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    console.log(formik.values);

    useEffect(() => {
        loadLessonPrograms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRecord]);

    console.log(lessonPrograms);
    console.log(formik.values.lessonsIdList);

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Update Teacher</Card.Title>
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
                                    optionLabel="label"
                                    optionValue="id"
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
                                    {loading && <ButtonSpinner />} Update
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditTeacherForm;
