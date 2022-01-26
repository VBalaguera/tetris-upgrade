import React from "react";
import "./Sections.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
        /*         onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)} */
      >
        {allSections}
        <SwiperSlide>
          <div className="section">
            <div className="section-left">
              <div
                style={{
                  backgroundImage:
                    "https://i.ibb.co/SrMbv04/perfect-tetris.gif",
                }}
                className="section-left__caption"
              >
                You know what's coming. How about you play some now? Scroll down
                and see.
              </div>
              <img
                className="section-left__img"
                src="https://i.ibb.co/SrMbv04/perfect-tetris.gif"
                alt=""
              />
            </div>
            <div className="section-right">
              <div className="section-right__top">
                <h1 className="section-right__top__title">
                  Sources and resources
                </h1>
                <div className="section-right__top__tetromino">
                  <img src="https://svgur.com/i/dhb.svg" alt="tetromino" />
                </div>
              </div>
              <div className="section-right__bottom">
                <div className="section-right__bottom__text">
                  <li>BBC's Tetris - From Russia with Love</li>
                  <li>
                    Electronika 60's first Tetris build screenshot from{" "}
                    <a
                      href="https://www.youtube.com/watch?v=omXjhq7DqQY"
                      target="#"
                    >
                      this video
                    </a>
                    .
                  </li>
                  <li>
                    Tetris for the{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Tetris_(NES_video_game)"
                      target="#"
                    >
                      Nintendo Entertainment System
                    </a>
                    .
                  </li>
                  <li>
                    Alexey Pajitnov's picture from{" "}
                    <a
                      href="https://www.nintendolife.com/news/2019/06/feature_tetris_creator_alexey_pajitnov_on_tetris_99_tetris_comics_and_his_favourite_tetris_piece"
                      target="#"
                    >
                      NintendoLife
                    </a>
                    .
                  </li>
                  <li>
                    Tetris Arcade machine by Kichigai Mentat via{" "}
                    <a
                      href="https://commons.wikimedia.org/wiki/File:Tetris_Arcade_Machine.jpg"
                      target="#"
                    >
                      Wikimedia Commons
                    </a>
                    .
                  </li>
                  <li>
                    Screenshot from Tetris Effect, from{" "}
                    <a
                      href="https://www.playstation.com/en-us/games/tetris-effect-ps4/"
                      target="#"
                    >
                      Sony
                    </a>
                    .
                  </li>
                  <li>
                    Screenshot from Kristin Leutwyler's Tetris Dream article,
                    from the{" "}
                    <a
                      href="https://www.scientificamerican.com/article/tetris-dreams/"
                      target="#"
                    >
                      Scientific American
                    </a>
                    .
                  </li>
                  <li>
                    Tetrominos/Tetrominoes via{" "}
                    <a href="https://tetris.wiki/Tetromino">Tetris.wiki</a>
                  </li>
                  <li>
                    Keycode information from{" "}
                    <a href="https://keycode.info/" target="#">
                      keycode.info
                    </a>
                    .
                  </li>
                  <li>
                    <a
                      href="https://www.retrogames.cz/play_1030-NES.php"
                      target="#"
                    >
                      Retrogames.cz
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
