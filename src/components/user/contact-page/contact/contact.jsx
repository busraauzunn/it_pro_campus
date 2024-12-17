import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ContactForm, GetInTouch } from "../../../components";
import { config } from "../../../../helpers/helpers";
import "./contact.scss";

const Contact = () => {
    return (
        <div className="contact-container">
            <Container>
                <Card>
                    <Card.Body>
                        <Row className="align-items-stretch">
                            <Col xl={8} className="p-3">
                                <ContactForm />
                            </Col>
                            <Col xl={4} className="p-3">
                                <GetInTouch />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <iframe
                src={config.contact.mapEmbedURL}
                width="100%"
                height={450}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"></iframe>
        </div>
    );
};

export default Contact;
