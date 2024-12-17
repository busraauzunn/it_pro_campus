import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { data } from "../../../../helpers/helpers";
import InstructorCard from "../instructor-card/instructor-card";
import "./instructors.scss";

const Instructors = () => {
    return (
        <Container>
            <Row>
                <Col lg={6} md={9} sm={12}>
                    <div className="instructors-title-container">
                        <h2>Our Most Experienced Instructors</h2>
                    </div>
                </Col>
                {data.instructors.map((instructor) => (
                    <Col sm={6} md={3} key={instructor.id}>
                        <InstructorCard {...instructor} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Instructors;
