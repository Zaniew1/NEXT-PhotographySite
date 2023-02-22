import classes from './PortfolioSlider.module.css';
import { portfolioData } from '../../../Data/Data';
import { CustomImage } from '../../UI/CustomImage';
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { MutableRefObject } from 'react';
export const PortfolioSlider:React.FC = () => {


    const [current, setCurrent] = useState<number>(0);
    // const length: number = slider.length;
    let containerRef = useRef() as MutableRefObject<HTMLDivElement>
    let carouselRef = useRef() as MutableRefObject<HTMLDivElement>
    const previousSlideHandler = () => {
        const containerWidth:number = containerRef.current.offsetWidth;
        setCurrent((prevState) => prevState - containerWidth);
        console.log(current)

            carouselRef.current.style.transform="translate("+current+"px, -50%)";

    };
    const nextSlideHandler = () => {
        const containerWidth:number = containerRef.current.offsetWidth;
        setCurrent((prevState) => prevState + containerWidth);
        console.log(current)
        carouselRef.current.style.transform="translate("+current+"px, -50%)";

    };
  
  
    const {thumbnail, name} = portfolioData[0];
 return(
    <div className={classes.slider}>
        <div className={classes.slider__carousel} ref={carouselRef}>
            <div className={classes.slider__container} ref={containerRef}>
                <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
            </div>
            <div className={classes.slider__container}>
                <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
            </div>
            <div className={classes.slider__container}>
                <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
            </div>
            <div className={classes.slider__container}>
                <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
            </div>
            <div className={classes.slider__container}>
                <CustomImage customClass={classes.slider__image__wrap} src={thumbnail} alt={name}/>
                <p className={classes.slider__names}>{name}</p>
            </div>
        </div>
        <div className={classes.slider__navigation}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={classes.slider__left}
            onClick={previousSlideHandler}
          />
          <div className={classes.slider__counter}>
            {/* {current + 1} / {slider.length} */}
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={classes.slider__right}
            onClick={nextSlideHandler}
          />
        </div>


    </div>
   );

}