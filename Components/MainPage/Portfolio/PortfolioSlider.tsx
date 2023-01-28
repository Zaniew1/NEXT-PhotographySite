import React, {useState, useRef, useEffect, useCallback} from 'react';
import classes from './PortfolioSlider.module.css';
import Image from 'next/image';
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { MotionConfig } from 'framer-motion';
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
    const [width, setWidth ] = useState<number>(0);
    ////DO ZMIANY
    const carousel = useRef<any>();
    const image = useRef<any>();
  
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[width]);


   return(
    <motion.div ref={carousel}  className={classes.portfolio__carousel} whileTap={{cursor: 'grabbing'}} >
        <motion.div drag="x"  dragConstraints={{right: 0, left: -width}}  className={classes.portfolio__inner}>
            {portfolioSlider.map((el) =>{
                return(
                    <motion.div  key={el.src} className={classes.portfolio__item} >
                         {/* <a className={classes.portfolio__link}  href={el.path}> */}
                      <Image
                            ref={image}
                          src={el.src}
                          alt='Kamila Koziara'
                          layout="fill"
                          objectFit="cover"
                          className={classes.portfolio__image}
                          quality={80}
                          />
                          {/* </a> */}
                    </motion.div>
                );
            })}
        </motion.div>

    </motion.div>
   );

}