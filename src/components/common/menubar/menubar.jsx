import React, { useEffect, useState } from "react";
import "./menubar.scss";
import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../../helpers/helpers";
import {
    FiAperture,
    FiAward,
    FiCalendar,
    FiHeadphones,
    FiHome,
} from "react-icons/fi";

const linksArray = [
    {
        id: 1,
        title: "Home",
        link: "/",
        icon: <FiHome />,
    },
    {
        id: 2,
        title: "Courses",
        link: "/courses",
        icon: <FiAperture />,
    },
    {
        id: 3,
        title: "Events",
        link: "/events",
        icon: <FiCalendar />,
    },
    {
        id: 4,
        title: "About",
        link: "/about",
        icon: <FiAward />,
    },
    {
        id: 5,
        title: "Contact",
        link: "/contact",
        icon: <FiHeadphones />,
    },
];

const Menubar = () => {
    const [dark, setDark] = useState(false);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 20) {
            setDark(true);
        } else {
            setDark(false);
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Navbar
            expand="lg"
            className={`menubar bg-opacity-75 py-3 ${
                dark ? "bg-dark" : "bg-body-tertiary"
            }`}
            sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image
                        src={`/assets/images/logo/${
                            dark ? "logo-white.png" : "logo.png"
                        }`}
                        alt={`${config.project.name} logo`}
                        title={config.project.name}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-lg"
                    placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <Image
                                src={`/assets/images/logo/${
                                    dark ? "logo-white.png" : "logo.png"
                                }`}
                                alt={`${config.project.name} logo`}
                                title={config.project.name}
                            />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            {linksArray.map((item) => (
                                <Nav.Link
                                    key={item.id}
                                    as={Link}
                                    to={item.link}>
                                    {item.icon} {item.title}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <a
                            href={`tel:${config.contact.phoneNumbers[0]}`}
                            className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                            role="button">
                            <FiHeadphones />
                            CALL NOW
                        </a>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Menubar;
