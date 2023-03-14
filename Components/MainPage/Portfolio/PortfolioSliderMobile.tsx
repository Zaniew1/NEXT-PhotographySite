import React, {useState, useEffect} from 'react';
import classes from './PortfolioSliderMobile.module.css';
import { CustomImage } from '../../UI/Images/CustomImage';
import { SliderNav } from '../../UI/SliderNav/SliderNav';
import { PortfolioElementType } from '../../../Types/types';
export const PortfolioSliderMobile:React.FC<{data:PortfolioElementType[] | {}[]}> = (props):JSX.Element => {
    const [index, setIndex] = useState<number>(0);
    useEffect(() => {
        const lastIndex:number = props.data.length - 1;
        if (index < 0) {
          setIndex(lastIndex);
        }
        if (index > lastIndex) {
          setIndex(0);
        }
      }, [index, props.data]);
    return(
        <div className={classes.slider}>
               <div className={classes.portfolio__slider__content}>
                {props.data.map((el, indexSlide)=>{
                  const{url, name} = el as PortfolioElementType
                  let position = `${classes.portfolio__element__next }`;
                  if(indexSlide === index){
                    position = `${classes.portfolio__element__active }`
                  }
                  if(indexSlide === index - 1 || (index === 0 && indexSlide === props.data.length - 1))
                  {
                    position = `${classes.portfolio__element__last }`
                  }
                  return(   
                    <article className={`${classes.portfolio__element} ${position}`} key={url}>
                        <CustomImage customClass={classes.portfolio__image__wrapper}src={url} alt={'Kamila Koziara'}/>
                      <p className={classes.portfolio__names}>{name}</p>
                    </article>
                )
                })}
               </div>
          <SliderNav black={true} index={index}  length={props.data.length} customClass={classes.portfolio__navigation} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
        </div>
           
    )
}