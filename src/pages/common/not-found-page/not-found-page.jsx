import "./not-found-page.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1>Oops! Class not in session.</h1>
            <p className="zoom-area">
                The page you're looking for seems to be on a study break. <br />{" "}
                Please check the URL or head back to the Home Page.
            </p>
            <section className="error-container">
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
                <span class="zero">
                    <span class="screen-reader-text">0</span>
                </span>
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
            </section>
            <div class="link-container">
                <Link to="/">Head Back To Home Page</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
