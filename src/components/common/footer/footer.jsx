import React from "react";
import { Col, Container, Image, Nav, Row } from "react-bootstrap";
import { config } from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row className="text-center text-lg-start gy-5">
                    <Col lg={3}>
                        <Image
                            src="/assets/images/logo/logo-white.png"
                            alt={config.project.name}
                            title={config.project.name}
                        />
                        <p className="mt-3">{config.project.description}</p>
                    </Col>
                    {config.footerLinks().map((section) => (
                        <Col lg={3} key={section.id}>
                            <h3>{section.heading}</h3>
                            <Nav className="flex-column">
                                {section.links.map((item) => (
                                    <Nav.Link
                                        key={item.id}
                                        as={Link}
                                        to={item.link}>
                                        {item.title}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Col>
                    ))}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
