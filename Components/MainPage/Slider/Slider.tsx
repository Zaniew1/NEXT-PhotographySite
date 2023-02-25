import classes from "./Slider.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { CustomImage } from "../../UI/CustomImage";
import {useEffect} from 'react';
import { mainPageData } from "../../../Data/Data";
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
                  <>
                  <article className={`${classes.slider__element} ${position}`} key={'z'}>
                      <CustomImage customClass={classes.slider__image__wrapper}src={el.src} alt={'Kamila Koziara'}/>
                      <div className={classes.slider__navigation}>
                      <div className={classes.slider__nav}>
                        <FontAwesomeIcon
                        icon={faAngleLeft}
                        className={classes.slider__left}
                        onClick={() => setIndex(index - 1)}
                        />
                        <div className={classes.slider__counter}>
                        {index + 1} / {slide.length}
                        </div>
                        <FontAwesomeIcon
                        icon={faAngleRight}
                        className={classes.slider__right}
                        onClick={() => setIndex(index + 1)}
                        />
                    </div>
              </div>
                  </article>
                </>
              )
              })}
                <div className={classes.slider__description}>
                  <p className={`${classes.slider__paragraph} ${classes.slider__paragraph__one}`}>
                    Jestem przekonana, że Twoje zdjęcia to Twoja spuścizna i że każdy,
                    kogo fotografuję pozostawia dla siebie niezapomnianą pamiątkę.
                  </p>
                  <p className={`${classes.slider__paragraph} ${classes.slider__paragraph__two}`}>
                    Jako fotografka ślubnych imprez uważam, że powinnam pracować w różnych
                    stylach. Czerpię inspiracje z fotografii reklamowych i mody oraz ze
                    znanych prac wybitnych artystów, którzy dbają o grę światła w swoich
                    pracach, takich jak Rembrandt.
                  </p>
                </div>
             </div>
            
         
      </div>
         
  )
};
{/* <div className={classes.slider__description}>
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
</div> */}