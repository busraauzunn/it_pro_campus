import React from "react";
import "./welcome.scss";
import { Col, Container, Image, Row } from "react-bootstrap";
import { config } from "../../../../helpers/helpers";

const Welcome = () => {
    return (
        <Container className="welcome-container">
            <Row className="flex">
                <Col lg={6}>
                    <Image
                        src="/assets/images/home/welcome.png"
                        alt="welcome to it pro campus"
                        className="img-fluid"
                    />
                </Col>
                <Col lg={6}>
                    <h2 className="mb-3">
                        Welcome to <span>{config.project.name}</span>
                    </h2>
                    <p className="mb-3">{config.welcome.description}</p>

                    <ul>
                        {config.welcome.list.map((item) => (
                            <li key={item.id}>{item.title}</li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Welcome;
