import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiLock, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import {
    data,
    encryptedLocalStorage,
    functions,
} from "../../../helpers/helpers";
import "./user-menu.scss";
import { logout } from "../../../context/slices/auth-slices";

const UserMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [show, setShow] = useState(false);
    const authState = useSelector((state) => state.auth);
    const { isLoggedIn, user } = authState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        functions
            .swalQuestion("Logout", "Are you sure you want to logout?")
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(logout());
                    encryptedLocalStorage.clear();
                    navigate("/");
                }
            });
    };

    const handleMenuClick = (link) => {
        handleClose();
        navigate(link);
    };

    useEffect(() => {
        if (!data.userMenu || !user?.role) return;
        if (data.userMenu[user?.role.toLowerCase()]) {
            setMenuItems(data.userMenu[user?.role.toLowerCase()]);
        }
    }, [user]);

    return (
        <>
            <ul className="user-menu-container">
                {isLoggedIn ? (
                    <li>
                        <Button onClick={handleShow} size="sm">
                            {user?.name} <FiMenu />
                        </Button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">
                            <FiLock /> Login
                        </Link>
                    </li>
                )}
            </ul>
            {isLoggedIn && (
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <Nav.Link
                                onClick={() => handleMenuClick("/dashboard")}>
                                Dashboard
                            </Nav.Link>
                            {menuItems.map((item) => (
                                <Nav.Link
                                    key={item.title}
                                    onClick={() => handleMenuClick(item.link)}>
                                    {item.title}
                                </Nav.Link>
                            ))}
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
};

export default UserMenu;

