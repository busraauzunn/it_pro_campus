import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./topbar.scss";
import { config } from "../../../helpers/helpers";
import { UserMenu } from "../../components";

const Topbar = () => {
    return (
        <div className="topbar-container">
            <Container>
                <Row className="align-items-center">
                    <Col md={9} className="d-none d-md-block">
                        📢 {config.project.slogan}
                    </Col>
                    <Col xs={12} md={3}>
                        <UserMenu />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Topbar;
