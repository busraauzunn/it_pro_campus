import React from "react";
import { Card } from "react-bootstrap";
import { FiClock, FiMapPin } from "react-icons/fi";
import "./event-card.scss";

const EventCard = (props) => {
    const eventsArray = [
        {
            id: 1,
            title: props.time,
            icon: <FiClock />,
        },
        {
            id: 2,
            title: props.location,
            icon: <FiMapPin />,
        },
    ];

    return (
        <Card className="event-card-container">
            <Card.Body>
                <div className="image-container">
                    <Card.Img
                        src={`/assets/images/events/${props.image}`}
                        alt={props.title}
                        title={props.title}
                    />
                </div>
                <Card.Subtitle>
                    {eventsArray.map((event) => (
                        <div key={event.id}>
                            {event.icon}
                            {event.title}
                        </div>
                    ))}
                </Card.Subtitle>
                <Card.Title>{props.title}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default EventCard;
