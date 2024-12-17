import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { data } from "../../../../helpers/helpers";
import { EventCard } from "../../../components";

const Events = () => {
    return (
        <Container>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
                {data.events.map((event) => (
                    <Col key={event.id}>
                        <EventCard {...event} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
