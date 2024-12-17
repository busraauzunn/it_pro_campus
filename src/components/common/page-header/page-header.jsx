import React from "react";
import "./page-header.scss";
import { useLocation } from "react-router-dom";

const PageHeader = () => {
    const { pathname } = useLocation();
    // Split the pathname by slashes
    const segments = pathname.split("/");
    // Take the last segment of the pathname
    const rawTitle = segments[segments.length - 1]; // ADMIN PAGE
    // Use regex to replace dashes and then convert to uppercase
    const title = rawTitle.replace(/-/g, " ").toUpperCase();
    return (
        <div className="page-header-container">
            <span>{title}</span>
        </div>
    );
};

export default PageHeader;
