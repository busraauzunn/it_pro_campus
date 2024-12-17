import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import "./mobile-app.scss";

const MobileApp = () => {
    return (
        <Container className="mobile-app-container">
            <Card bg="primary">
                <Card.Body>
                    <h2>Are you ready to start your online course?</h2>
                    <div className="mobile-app__button-container">
                        <Button variant="outline-secondary" size="lg">
                            <FaApple /> Apple Store
                        </Button>
                        <Button variant="outline-secondary" size="lg">
                            <FaGooglePlay /> Play Store
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MobileApp;
