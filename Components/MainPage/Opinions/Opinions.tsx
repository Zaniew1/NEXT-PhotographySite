import React, {useState, useEffect} from 'react';
import classes from './Opinions.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
const opinionsSlider = [{
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
export const Opinions:React.FC = () => {
    const [slide] = useState(opinionsSlider)
    const [index, setIndex] = useState<number>(0);

    const lastIndex = opinionsSlider.length -1;
   
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

                                <Image
                                    src={el.src}
                                    alt='Kamila Koziara'
                                    layout="fill"
                                    objectFit="cover"
                                    className={classes.opinions__image}
                                    />
                        </article>
                        
                        </>
                        )
                        
                })}
                <p className={classes.opinions__text}>{opinionsSlider[0].text}</p>
                <div className={classes.opinions__navigation}>
                    <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={classes.opinions__left}
                    onClick={() => setIndex(index - 1)}
                    />
                    <div className={classes.opinions__counter}>

                   
                   
                    </div>
                    <FontAwesomeIcon
                    icon={faAngleRight}
                    className={classes.opinions__right}
                    onClick={() => setIndex(index + 1)}
                    />
                </div>
               </div>
               
              
            
        </div>
           
    )
}