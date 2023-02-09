import Image from 'next/image';
import classes from './OpinionCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import {useState, useEffect} from 'react'
import { useFetchFireStore } from '../../hooks/useFetchFirestore';

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
export const OpinionCard:React.FC = ()=>{
    const opinionData = useFetchFireStore('Opinion');
    console.log(opinionData);
    return(
        <div className={classes.card}>
             <div className={classes.card__wrapper}>
                <h1 className={classes.card__header}>KIND WORDS FROM MY BRIDES & GROOMS</h1>
                <p className={classes.card__paragraph}>Thanks to everyone for your feedback about my wedding or pre-wedding photography. It means a lot to me that you love the images and having a great time with me as your photographer.</p>
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className={classes.card__names}
                />
                <Image
                  src={"/../public/img/picture3.jpg"}
                  alt={"Zdjęcie"}
                  layout="fill"
                  objectFit="cover"
                  className={classes.card__image}
                  quality={80}
                  />
                    </div>
            {opinionsSlider.map(el=>{
                return(
                    <div className={classes.card__overlapper} key={el.src}>
                        <div className={classes.card__wrapper} key={el.src}>
                            <p className={classes.card__paragraph}>{el.comment}</p>
                            <div className={classes.card__names}>{el.text}</div>
                            <Image
                            src={el.src}
                            alt={el.text}
                            layout="fill"
                            objectFit="cover"
                            className={classes.card__image}
                            quality={80}
                            />
                        </div>
                    </div>
                )
            })}

        </div>
    )
}