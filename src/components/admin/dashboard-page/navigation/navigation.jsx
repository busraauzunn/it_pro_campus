import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { data } from "../../../../helpers/helpers";
import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (!data.userMenu || !user?.role) return;
        if (data.userMenu[user?.role.toLowerCase()]) {
            setMenuItems(data.userMenu[user?.role.toLowerCase()]);
        }
    }, [user]);

    return (
        <Container className="admin-navigation-container">
            <Row>
                {menuItems.map((item) => (
                    <Col md={6} lg={4} key={item.title}>
                        <Link to={item.link}>
                            <Card>
                                <Card.Body>{item.title}</Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Navigation;
