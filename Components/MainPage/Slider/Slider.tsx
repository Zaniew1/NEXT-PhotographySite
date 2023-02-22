import classes from "./Slider.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { CustomImage } from "../../UI/CustomImage";

type sliderType = {img: string; alt: string}[] | null

const slider: sliderType = [
  { img: "/../public/img/1.jpg", alt: "1" },
  { img: "/../public/img/2.jpg", alt: "2" },
  { img: "/../public/img/3.jpg", alt: "3" },
  { img: "/../public/img/picture1.jpg", alt: "4" },
];
export const Slider:React.FC = ():JSX.Element => {
  const [current, setCurrent] = useState<number>(0);
  const length: number = slider.length;
  const previousSlideHandler = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const nextSlideHandler = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  return (
    <section className={classes.slider}>
      <div className={classes.slider__wrap}>
        <div className={classes.slider__navigation}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={classes.slider__left}
            onClick={previousSlideHandler}
          />
          <div className={classes.slider__counter}>
            {current + 1} / {slider.length}
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={classes.slider__right}
            onClick={nextSlideHandler}
          />
        </div>

        {slider.map((slider, index) => {
          return (
            <CustomImage key={slider.img+index} src={slider.img} alt={slider.alt} customClass={index === current?`${classes.slider__slide} ${classes.slider__active}`: classes.slider__slide}/>
          );
        })}
      </div>
      <div className={classes.slider__description}>
        <p
          className={`${classes.slider__paragraph} ${classes.slider__paragraph__one}`}
        >
          Jestem przekonana, że Twoje zdjęcia to Twoja spuścizna i że każdy,
          kogo fotografuję pozostawia dla siebie niezapomnianą pamiątkę.
        </p>
        <p
          className={`${classes.slider__paragraph} ${classes.slider__paragraph__two}`}
        >
          Jako fotografka ślubnych imprez uważam, że powinnam pracować w różnych
          stylach. Czerpię inspiracje z fotografii reklamowych i mody oraz ze
          znanych prac wybitnych artystów, którzy dbają o grę światła w swoich
          pracach, takich jak Rembrandt.
        </p>
      </div>
    </section>
  );
};
