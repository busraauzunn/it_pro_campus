import React from "react";
import { Container } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { data } from "../../../../helpers/helpers";
import { EventCard } from "../../../components";
import "./upcoming-events.scss";

const UpcomingEvents = () => {
    const filteredEvents = data.events.filter(
        (event) => new Date(event.date) > new Date()
    );

    return (
        <Container className="upcoming-events-container">
            <h2>
                <span className="review-swiper-button-prev">
                    <FiChevronLeft />
                </span>
                <span>Upcoming Events</span>
                <span className="review-swiper-button-next">
                    <FiChevronRight />
                </span>
            </h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                    prevEl: ".review-swiper-button-prev",
                    nextEl: ".review-swiper-button-next",
                }}
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                }}>
                {filteredEvents.map((event) => (
                    <SwiperSlide key={event.id}>
                        <EventCard {...event} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default UpcomingEvents;
