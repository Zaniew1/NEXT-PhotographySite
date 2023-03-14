import classes from './PortfolioSliderDesktop.module.css';
import { portfolioData } from '../../../Data/Data';
import { CustomImage } from '../../UI/Images/CustomImage';
import { useState, useRef, useEffect } from "react";
import { SliderNav } from '../../UI/SliderNav/SliderNav';
import { MutableRefObject } from 'react';
import { PortfolioElementType } from '../../../Types/types';

export const PortfolioSliderDesktop:React.FC<{data:PortfolioElementType[] | {}[]}> = (props) => {
  console.log(props)
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
      if(current < ((-props.data.length)+4)){
        return
      }
      else{
        setCurrent(current-1);
      }
    };
    useEffect(()=>{
        const containerWidth:number = containerRef.current?.offsetWidth;
      carouselRef.current.style.transform="translate("+(current*containerWidth)+"px, -50%)";
        
      },[current])
 return(
    <div className={classes.slider__container}>
        <div className={classes.slider__carousel} ref={carouselRef}>
          {props.data.map(el=>{
            const {name, url} = el as PortfolioElementType
            return( 
              <div className={classes.slider__card__container} ref={containerRef} key={name+Math.random()*1000}>
                <CustomImage customClass={classes.slider__card} src={url} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
              </div>
          )
          })}
          </div>
          <SliderNav black={true} index={current} customClass={classes.slider__navigation} length={portfolioData.length} moveLeft={previousSlideHandler} moveRight={nextSlideHandler} counterInvisible={true}/>
    </div>
   );

}
