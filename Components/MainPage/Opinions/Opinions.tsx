import React, {useState, useEffect} from 'react';
import classes from './Opinions.module.css';
import { CustomImage } from '../../UI/Images/CustomImage';
import { opinionsSlider } from '../../../Data/Data';
import { SliderNav } from '../../UI/SliderNav/SliderNav';
export const Opinions:React.FC = ():JSX.Element => {
    const [slide] = useState<{src: string, path: string, text:string, comment:string}[]>(opinionsSlider)
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
                {slide.map((el, indexSlide)=>{
                  let position = `${classes.opinions__element__next }`;
                  if(indexSlide === index){
                    position = `${classes.opinions__element__active }`
                  }
                  if(indexSlide === index - 1 || (index === 0 && indexSlide === slide.length - 1))
                  {
                    position = `${classes.opinions__element__last }`
                  }
                  return(   
                    <>
                    <article className={`${classes.opinions__element} ${position}`} key={el.src}>
                      <div className={classes.opinions__feedback}>
                        <p className={classes.opinions__text}>&quot;{opinionsSlider[indexSlide].comment} &quot;</p>
                        <p className={classes.opinions__names}>{el.text}</p>
                      </div>
                      <div className={classes.opinions__navigation}>
                        <div className={classes.opinions__background}></div>
                        <div className={classes.opinions__title}>Opinie</div>
                          <SliderNav black={false} index={index} length={slide.length} moveLeft={() => setIndex(index - 1)} moveRight={() => setIndex(index + 1)} />
             
                      </div>
                      <a className={classes.opinions__link} href={el.path}>
                        <CustomImage className={classes.opinions__image} customClass={classes.opinions__image__wrapper}src={el.src} alt={'Kamila Koziara'}/>
                      </a>
                    </article>
                  </>
                )
                })}
            </div>
        </div>
    )
}
