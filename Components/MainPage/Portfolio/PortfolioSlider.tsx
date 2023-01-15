import React, {useState, useEffect} from 'react';
import classes from './PortfolioSlider.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
const portfolioSlider = [{
    src: '/../public/img/picture2.jpg',
    path: '',
    text: 'Mateusz & Wiktoria',

},
{
    src: '/../public/img/picture3.jpg',
    path: '',
    text: 'Patryk & Agata',

},
{
    src: '/../public/img/picture4.jpg',
    path: '',
    text: 'Christina & Emil',

},{
    src: '/../public/img/picture1.jpg',
    path: '',
    text: 'Christina & Emil',

}
]
export const PortfolioSlider:React.FC = () => {
    const [slide] = useState(portfolioSlider)
    const [index, setIndex] = useState<number>(0);

    const lastIndex = portfolioSlider.length -1;
   
    useEffect(() => {
        const lastIndex = slide.length - 1;
        if (index < 0) {
          setIndex(lastIndex);
        }
        if (index > lastIndex) {
          setIndex(0);
        }
      }, [index, slide]);
    
      useEffect(() => {
        let slider = setInterval(() => {
          setIndex(index + 1);
        }, 5000);
        return () => {
          clearInterval(slider);
        };
      }, [index]);
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
                        <article className={`${classes.portfolio__element} ${position}`} key={el.src}>

                                <Image
                                    src={el.src}
                                    alt='Kamila Koziara'
                                    layout="fill"
                                    objectFit="cover"
                                    className={classes.portfolio__image}
                                    />
                              </article>
                        </>
                        
                        )
                })}
               </div>
               
               {slide.map((el, indexSlide)=>{
                        return(   
                            <div key={indexSlide} className={ index != indexSlide
                                ? classes.portfolio__name
                                : `${classes.portfolio__name} ${classes.portfolio__name__active}`}>{el.text}</div>
                        )
                            })}
            <div className={classes.portfolio__navigation}>
                    <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={classes.portfolio__left}
                    onClick={() => setIndex(index - 1)}
                    />
                    <div className={classes.portfolio__counter}>

                    {slide.map((el, indexSlide)=>{
                        return(   
                            <div key={indexSlide} className={ index != indexSlide
                                ? classes.portfolio__dot
                                : `${classes.portfolio__dot} ${classes.portfolio__dot__active}`}></div>
                                
                                )
                            })}
                   
                    </div>
                    <FontAwesomeIcon
                    icon={faAngleRight}
                    className={classes.portfolio__right}
                    onClick={() => setIndex(index + 1)}
                    />
                </div>
        </div>
           
    )
}