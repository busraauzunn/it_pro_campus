import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { data } from "../../../../helpers/helpers";
import "./slider.scss";

const Slider = () => {
    return (
        <Carousel fade>
            {data.slider.map((slide) => (
                <Carousel.Item key={slide.id}>
                    <Image
                        src={`/assets/images/slider/${slide.image}`}
                        className="img-fluid"
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.desc}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Slider;
