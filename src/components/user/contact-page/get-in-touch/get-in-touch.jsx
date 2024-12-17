import React from "react";
import { config } from "../../../../helpers/helpers";
import { FiHeadphones, FiMail, FiMapPin } from "react-icons/fi";
import { Nav } from "react-bootstrap";

const getInTouchArray = [
    {
        id: 1,
        title: config.contact.phoneNumbers[0],
        link: `tel: ${config.contact.phoneNumbers[0]}`,
        icon: <FiHeadphones />,
    },
    {
        id: 2,
        title: config.contact.phoneNumbers[1],
        link: `tel: ${config.contact.phoneNumbers[1]}`,
        icon: <FiHeadphones />,
    },
    {
        id: 3,
        title: config.contact.email,
        link: `mailto: ${config.contact.email}`,
        icon: <FiMail />,
    },
    {
        id: 4,
        title: config.contact.address,
        link: config.contact.address,
        icon: <FiMapPin />,
    },
];

const GetInTouch = () => {
    return (
        <div className="get-in-touch-container h-100 d-flex flex-column">
            <h2>Get In Touch</h2>
            <Nav className="flex-nowrap flex-column flex-grow-1 justify-content-evenly">
                {getInTouchArray.map((item) => (
                    <Nav.Link
                        className="d-flex align-items-center gap-2"
                        key={item.id}
                        to={item.link}>
                        {item.icon}
                        {item.title}
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

export default GetInTouch;
