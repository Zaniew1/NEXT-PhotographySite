import React, {useState, useEffect} from 'react';
import classes from './PortfolioSliderMobile.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { CustomImage } from '../../UI/Images/CustomImage';
import { SliderNav } from '../../UI/SliderNav/SliderNav';
import { portfolioData } from '../../../Data/Data';
export const PortfolioSliderMobile:React.FC = ():JSX.Element => {
    const [slide] = useState<{thumbnail: string,name:string, place:string, orientation: number}[]>(portfolioData)
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
               <div className={classes.portfolio__slider__content}>
                {slide.map((el, indexSlide)=>{
                  let position = `${classes.portfolio__element__next }`;
                  if(indexSlide === index){
                    position = `${classes.portfolio__element__active }`
                  }
                  if(indexSlide === index - 1 || (index === 0 && indexSlide === slide.length - 1))
                  {
                    position = `${classes.portfolio__element__last }`
                  }
                  return(   
                    <>
                    <article className={`${classes.portfolio__element} ${position}`} key={el.thumbnail}>
                        <CustomImage customClass={classes.portfolio__image__wrapper}src={el.thumbnail} alt={'Kamila Koziara'}/>
                      <p className={classes.portfolio__names}>{el.name}</p>
                    </article>
                  </>
                )
                })}
               </div>
          <SliderNav black={true} index={index}  length={slide.length} customClass={classes.portfolio__navigation} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
        </div>
           
    )
}