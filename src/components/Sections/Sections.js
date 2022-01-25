import React from "react";
import "./Sections.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Game from "../Game/Game";

export default function Sections({ contents }) {
  const allSections = contents.map((content) => {
    return (
      <SwiperSlide>
        <div className="section">
          <div className="section-left">
            <div
              style={{ backgroundImage: content.img }}
              className="section-left__caption"
            >
              {content.imgcaption}
            </div>
            <img className="section-left__img" src={content.img} alt="" />
          </div>
          <div className="section-right">
            <div className="section-right__top">
              <h1 className="section-right__top__title">{content.title}</h1>
              <div className="section-right__top__tetromino">
                <img src={content.tetromino} alt="tetromino" />
              </div>
            </div>
            <div className="section-right__bottom">
              <p className="section-right__bottom__subtitle">
                {content.subtitle}
              </p>
              <p className="section-right__bottom__text">{content.text}</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper
        modules={[Pagination, Keyboard]}
        pagination
        spaceBetween={50}
        slidesPerView={1}
        keyboard={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {allSections}
        <SwiperSlide>
          <Game />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
