import React, {useState, useEffect} from 'react';
import classes from './Opinions.module.css';
import { CustomImage } from '../../UI/Images/CustomImage';
import { SliderNav } from '../../UI/SliderNav/SliderNav';
import { OpinionElementType } from '../../../Types/types';
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
export const Opinions = (props:{data:OpinionElementType[]}):JSX.Element => {
   const [fetchedProperties] = useState<OpinionElementType[]>(props.data)
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
    
      useEffect(() => {
        let slider:ReturnType<typeof setInterval> = setInterval(() => {
          setIndex(index + 1);
        }, 5000);
        return () => {
          clearInterval(slider);
        };
      }, [index]);
    return(
        <div className={classes.slider}>
               <div className={classes.opinions__slider__content}>
                {fetchedProperties.map((el, indexSlide)=>{
                  const {url, name, description} = el as OpinionElementType;
                  let position = `${classes.opinions__element__next }`;
                  if(indexSlide === index){
                    position = `${classes.opinions__element__active }`
                  }
                  if(indexSlide === index - 1 || (index === 0 && indexSlide === fetchedProperties.length - 1))
                  {
                    position = `${classes.opinions__element__last }`
                  }
                  return(   
                    <article className={`${classes.opinions__element} ${position}`} key={url}>
                      <div className={classes.opinions__feedback}>
                        <p className={classes.opinions__text}>&quot;{description} &quot;</p>
                        <p className={classes.opinions__names}>{name}</p>
                      </div>
                      <div className={classes.opinions__navigation}>
                        <div className={classes.opinions__background}></div>
                        <div className={classes.opinions__title}>Opinie</div>
                          <SliderNav black={false} index={index} length={fetchedProperties.length} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
             
                      </div>
                      <div className={classes.opinions__link} >
                        <CustomImage imageClass={classes.opinions__image} customClass={classes.opinions__image__wrapper}src={url} alt={name}/>
                      </div>
                    </article>
                )
                })}
            </div>
        </div>
    )
}
