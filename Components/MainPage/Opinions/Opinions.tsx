import React, {useState, useEffect} from 'react';
import classes from './Opinions.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import asd from '../../../public/img/quote-mark.svg'
const opinionsSlider = [{
    src: '/../public/img/picture2.jpg',
    path: '',
    text: 'Mateusz & Wiktoria',
    comment: "Kiedy dostałem zdjęcia, od razu spojrzałem i zapomniałem odpowiedzieć. Jesteśmy bardzo zadowoleni ze wszystkich zdjęć! tak piękne !!  bardzo dziękuję."
},
{
    src: '/../public/img/picture3.jpg',
    path: '',
    text: 'Patryk & Agata',
    comment: " razu spojrzałem i zapomniałem odpowiedzieć. Jesteśmy bardzo zadowoleni ze wszystkich zdjęć! tak piękne !!  bardzo dziękuję."
},
{
    src: '/../public/img/picture4.jpg',
    path: '',
    text: 'Christina & Emil',
    comment: " dostałem zdjęcia, od razu spojrzałem i zapomniałem odpowiedzieć. Jesteśmy bardzo zadowoleni ze wszystkich zdjęć! tak piękne !!  bardzo dziękuję."


},{
    src: '/../public/img/picture1.jpg',
    path: '',
    text: 'Christina & Pedał',
    comment: "Kiedy od razu spojrzałem i zapomniałem odpowiedzieć. Jesteśmy bardzo zadowoleni ze wszystkich zdjęć! tak piękne !!  bardzo dziękuję."


}
]
export const Opinions:React.FC = () => {
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
                        <div className={classes.opinions__title}>opinie</div>
                        <div className={classes.opinions__nav}>
                          <FontAwesomeIcon
                          icon={faAngleLeft}
                          className={classes.opinions__left}
                          onClick={() => setIndex(index - 1)}
                          />
                          <div className={classes.opinions__counter}>
                          {index + 1} / {slide.length}
                          </div>
                          <FontAwesomeIcon
                          icon={faAngleRight}
                          className={classes.opinions__right}
                          onClick={() => setIndex(index + 1)}
                          />
                      </div>
                      </div>
                      <a className={classes.opinions__link} href={el.path}>
                      <Image
                          src={el.src}
                          alt='Kamila Koziara'
                          layout="fill"
                          objectFit="cover"
                          className={classes.opinions__image}
                          quality={80}
                          />
                          </a>
                        </article>
                        
                        </>
                        )
                        
                })}
               
               </div>
               
              
            
        </div>
           
    )
}