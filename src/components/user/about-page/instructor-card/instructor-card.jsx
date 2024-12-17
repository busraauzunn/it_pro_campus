import React from "react";
import { Card } from "react-bootstrap";
import "./instructor-card.scss";

const InstructorCard = (props) => {
    return (
        <Card className="instructor-card-container">
            <div className="instructor-card__image-container">
                <Card.Img
                    src={`/assets/images/instructors/${props.image}`}
                    alt={`${props.firstName} ${props.lastName}`}
                    title={`${props.firstName} ${props.lastName}`}
                />
            </div>
            <Card.Title>
                <h4>
                    {props.firstName} {props.lastName}
                </h4>
                <h6>{props.title}</h6>
            </Card.Title>
        </Card>
    );
};

export default InstructorCard;
