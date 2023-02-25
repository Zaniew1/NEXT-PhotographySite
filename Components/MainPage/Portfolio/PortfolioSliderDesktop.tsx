import classes from './PortfolioSliderDesktop.module.css';
import { portfolioData } from '../../../Data/Data';
import { CustomImage } from '../../UI/CustomImage';
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MutableRefObject } from 'react';
export const PortfolioSliderDesktop:React.FC = () => {
    const [current, setCurrent] = useState<number>(0);
    let containerRef = useRef() as MutableRefObject<HTMLDivElement>
    let carouselRef = useRef() as MutableRefObject<HTMLDivElement>
    const previousSlideHandler = () => {
      if(current == 0){
        return
      }
      else{
        setCurrent(current+1);
      }
    };
    const nextSlideHandler = () => {
      if(current < ((-portfolioData.length)+4)){
        return
      }
      else{
        setCurrent(current-1);
      }
    };
    useEffect(()=>{
        const containerWidth:number = containerRef.current.offsetWidth;
      carouselRef.current.style.transform="translate("+(current*containerWidth)+"px, -50%)";
        
      },[current])
 return(
    <div className={classes.slider__container}>
        <div className={classes.slider__carousel} ref={carouselRef}>
          {portfolioData.map(el=>{
            return( 
              <div className={classes.slider__card__container} ref={containerRef} key={el.name+Math.random()*1000}>
                <CustomImage customClass={classes.slider__card} src={el.thumbnail} alt={el.name}/>
                <p className={classes.slider__names}>{el.name}</p>
              </div>
          )
          })}
          </div>
        <div className={classes.slider__navigation}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={classes.slider__left}
            onClick={previousSlideHandler}
            />
          <FontAwesomeIcon
              icon={faAngleRight}
              className={classes.slider__right}
              onClick={nextSlideHandler}
              />
        </div> 
    </div>
   );

}
