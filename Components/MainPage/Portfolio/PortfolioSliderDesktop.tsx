import classes from './PortfolioSliderDesktop.module.css';
import { CustomImage } from '../../UI/Images/CustomImage';
import { useState, useRef, useEffect } from "react";
import { MutableRefObject } from 'react';
import { PortfolioElementType } from '../../../Types/types';
import { useRouter } from 'next/router';

export const PortfolioSliderDesktop:React.FC<{data:PortfolioElementType[], current: number}> = (props) => {
    let containerRef = useRef() as MutableRefObject<HTMLDivElement>
    let carouselRef = useRef() as MutableRefObject<HTMLDivElement>
    const router = useRouter();
    
    useEffect(()=>{
        const containerWidth:number = containerRef.current?.offsetWidth;
      carouselRef.current.style.transform="translate("+(props.current*containerWidth)+"px, 0)";
        
      },[props]);

 return(
    <div className={classes.slider__container}>
        <div className={classes.slider__carousel} ref={carouselRef}>
          {props.data?.map(el=>{
             const navigateProgrammaticlyHandler = () =>{
              router.push('portfolio/'+el.id);
          }
            const {name, url} = el as PortfolioElementType
            return( 
              <div onClick={navigateProgrammaticlyHandler} className={classes.slider__card__container} ref={containerRef} key={name+Math.random()*1000}>
                <CustomImage imageClass={classes.slider__picture} customClass={classes.slider__card} src={url} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
              </div>
          )
          })}
          </div>
    </div>
   );

}
