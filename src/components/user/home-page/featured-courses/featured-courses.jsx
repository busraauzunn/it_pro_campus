import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { data } from "../../../../helpers/helpers";
import { CourseCard } from "../../../components";
import "./featured-courses.scss";

const FeaturedCourses = () => {
    const filteredCourses = data.courses.filter((course) => course.featured);

    return (
        <div className="featured-courses-container">
            <Container>
                <h2>Featured Courses</h2>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
                    {filteredCourses.map((course) => (
                        <Col key={course.id}>
                            <CourseCard {...course} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default FeaturedCourses;
