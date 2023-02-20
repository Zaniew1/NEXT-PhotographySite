import Image from 'next/image';
import classes from './OpinionCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import {useState, useEffect} from 'react'
import { useFetchFireStore } from '../../hooks/useFetchFirestore';
import { opinionsSlider } from '../../Data/Data';
import { CustomImage } from '../UI/CustomImage';

export const OpinionCard:React.FC = (): JSX.Element =>{
    const opinionData = useFetchFireStore('Opinion');
    return(
        <div className={classes.card}>
             <div className={classes.card__wrapper}>
                <CustomImage customClass={classes.card__image__wrapper}  alt={"Zdjęcie"} src={"/../public/img/picture3.jpg"}/>
                <h1 className={classes.card__header}>KIND WORDS FROM MY BRIDES & GROOMS</h1>
                <p className={classes.card__paragraph}>Thanks to everyone for your feedback about my wedding or pre-wedding photography. It means a lot to me that you love the images and having a great time with me as your photographer.</p>
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className={classes.card__names}
                />
            </div>
            {opinionsSlider.map(el=>{
                return(
                    <div className={classes.card__overlapper} key={el.src}>
                        <div className={classes.card__wrapper} >
                            <CustomImage customClass={classes.card__image__wrapper} className={classes.card__image} alt={el.text} src={el.src}/>
                            <p className={classes.card__paragraph}>{el.comment}</p>
                            <div className={classes.card__names}>{el.text}</div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}