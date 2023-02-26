import classes from "./Slider.module.css";
import { useState } from "react";
import { CustomImage } from "../../UI/Images/CustomImage";
import {useEffect} from 'react';
import { mainPageData } from "../../../Data/Data";
import { SliderNav } from "../../UI/SliderNav/SliderNav";
type sliderType = {src: string; alt: string}[];


export const Slider:React.FC = ():JSX.Element => {
  const [slide] = useState<sliderType>(mainPageData)

  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
      const lastIndex:number = slide.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }
      if (index > lastIndex) {
        setIndex(0);
      }
    }, [index, slide]);
  
  
  return(
      <div className={classes.slider}>
             <div className={classes.slider__slider__content}>
              {slide.map((el, indexSlide)=>{
                let position = `${classes.slider__element__next }`;
                if(indexSlide === index){
                  position = `${classes.slider__element__active }`
                }
                if(indexSlide === index - 1 || (index === 0 && indexSlide === slide.length - 1))
                {
                  position = `${classes.slider__element__last }`
                }
                return(   
                  <article className={`${classes.slider__element} ${position}`} key={el.src}>
                    <div className={classes.slider__feedback}>
                    </div>
                    <div className={classes.slider__navigation}>
                      <div className={classes.slider__background}></div>
                        <SliderNav black={false} index={index} length={slide.length} customClass={classes.slider__nav} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
           
                    </div>
                      <CustomImage className={classes.slider__image} customClass={classes.slider__image__wrapper}src={el.src} alt={'Kamila Koziara'}/>
                  </article>
              )
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
      </div>
  )
};
