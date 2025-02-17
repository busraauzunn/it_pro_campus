import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { data } from "../../../../helpers/helpers";
import { CourseCard } from "../../../components";

const Courses = () => {
    return (
        <Container>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
                {data.courses.map((course) => (
                    <Col key={course.id}>
                        <CourseCard {...course} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Courses;





