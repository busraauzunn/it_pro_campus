import React from "react";
import "./unauthorized-page.scss";
import { Button } from "react-bootstrap";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div className="unauthorized-page-container">
            <div className="lock"></div>
            <div className="message">
                <h1>Access to this page is restricted</h1>
                <p>
                    Please check with the site admin if you believe this is a
                    mistake.
                </p>
                <Button className="btn-back" onClick={() => navigate(-1)}>
                    <FiChevronLeft /> Go Back
                </Button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
