import classes from './Portfolio.module.css'
import {Button} from '../../UI/Button';
import { useState } from "react";
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

}]
export const Portfolio =()=>{
    const [index, setIndex] = useState<number>(0);
    const [current, setCurrent] = useState<string>('');
    const previousSlideHandler = () => {
        setIndex(index + 100)
        setCurrent(`${index}`)
    //   setCurrent(current === 0 ? portfolioSlider.length - 1 : current - 1);
    };
    const nextSlideHandler = () => {
    //   setCurrent(current === portfolioSlider.length - 1 ? 0 : current + 1);
    setIndex(index - 100)
    setCurrent(`-${index}`)
    };
    // if (!Array.isArray(portfolioSlider) || portfolioSlider.length <= 0) {
    //   return null;
    // }
  
    return (<section className={classes.portfolio}>
        <div className={classes.portfolio__content}>
            <p className={classes.portfolio__header}>Reportaż i sesja ślubna</p>
            <Button text={'Portfolio'} path={'/portfolio'} className={classes.portfolio__button}/>
        </div>
        <div className={classes.portfolio__slider}>
            <div className={classes.portfolio__slider__content}>
                {portfolioSlider.map((el)=>{
                    return(   
                        <div className={classes.portfolio__element} style={{transform: `translateX(${current}%)`}} key={Math.random()* 10000}>
                            <Image
                                src={el.src}
                                alt='Kamila Koziara'
                                layout="fill"
                                objectFit="cover"
                                className={classes.portfolio__image}
                            />
                        </div>)
                })}
            </div>
            <div className={classes.portfolio__navigation}>
                <FontAwesomeIcon
                icon={faAngleLeft}
                className={classes.portfolio__left}
                onClick={previousSlideHandler}
                />
                <div className={classes.portfolio__counter}>
                {/* {current + 1} / {portfolioSlider.length} */}
                </div>
                <FontAwesomeIcon
                icon={faAngleRight}
                className={classes.portfolio__right}
                onClick={nextSlideHandler}
                />
            </div>
        </div>
       
        
    </section>
    
   )

}