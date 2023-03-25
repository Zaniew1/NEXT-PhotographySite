import classes from "./Slider.module.css";
import { useState } from "react";
import { CustomImage } from "../../UI/Images/CustomImage";
import {useEffect} from 'react';
import { SliderNav } from "../../UI/SliderNav/SliderNav";
import { MainElementType, MainPropertiesToSendType } from "../../../Types/types";

export const Slider = (props:{data:MainElementType[]}):JSX.Element => {
const [fetchedProperties] =  useState<MainElementType[]>(props.data)
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
      const lastIndex:number = fetchedProperties.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }
      if (index > lastIndex) {
        setIndex(0);
      }
    }, [index, fetchedProperties]);
  return(
      <div className={classes.slider}>
             <div className={classes.slider__slider__content}>
              {fetchedProperties.length >1 && fetchedProperties.map((el: MainPropertiesToSendType | {}, indexSlide)=>{
                const {url, name,} =  el as MainElementType
                let position = `${classes.slider__element__next }`;
                if(indexSlide === index){
                  position = `${classes.slider__element__active }`
                }
                if(indexSlide === index - 1 || (index === 0 && indexSlide === fetchedProperties.length - 1))
                {
                  position = `${classes.slider__element__last }`
                }
                return(   
                  <article className={`${classes.slider__element} ${position}`} key={url}>
                    <div className={classes.slider__feedback}>
                    </div>
                    <div className={classes.slider__navigation}>
                      <div className={classes.slider__background}></div>
                        <SliderNav black={false} index={index} length={fetchedProperties.length} customClass={classes.slider__nav} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
           
                    </div>
                      <CustomImage imageClass={classes.slider__image} customClass={classes.slider__image__wrapper} src={url} alt={name}/>
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
