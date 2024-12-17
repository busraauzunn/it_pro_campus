import React from "react";
import { Card } from "react-bootstrap";
import { FiDollarSign, FiTrendingUp, FiUser } from "react-icons/fi";
import "./course-card.scss";

const CourseCard = (props) => {
    const subArray = [
        {
            id: 1,
            title: props.user,
            icon: <FiUser />,
        },
        {
            id: 2,
            title: props.rating,
            icon: <FiTrendingUp />,
        },
        {
            id: 3,
            title: props.price,
            icon: <FiDollarSign />,
        },
    ];

    return (
        <Card className="course-card-container">
            <Card.Body>
                <div className="image-container">
                    <Card.Img
                        src={`/assets/images/courses/${props.image}`}
                        alt={props.title}
                        title={props.title}
                    />
                </div>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle>
                    {subArray.map((item) => (
                        <div key={item.id}>
                            {item.icon}
                            {item.title}
                        </div>
                    ))}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
