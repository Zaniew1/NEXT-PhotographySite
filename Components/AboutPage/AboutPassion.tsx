import classes from './AboutPassion.module.css';
import Image from 'next/image'
import { Button } from '../UI/Button';
import { BackgroundImage } from '../UI/BackgroundImage';
import { CustomImage } from '../UI/CustomImage';

export const AboutPassion = () => {
    return(
        <div className={classes.passion__wrapper}>
            <h2 className={classes.passion__header}>HISTORIA DZIEWCZYNY Z PASJĄ I WIELOMA PODRÓŻAMI</h2>
            <CustomImage customClass={classes.passion__image__wrapper__one} src={'/../public/img/1.jpg'} alt={"Zdjęcie pary"}/>
            <CustomImage customClass={classes.passion__image__wrapper__two} src={'/../public/img/2.jpg'} alt={"Zdjęcie pary"}/>
            <div className={classes.passion__text}>
                <p className={classes.passion__paragraph}>Zanim zostałam fotografką, pracowałam w sektorze sprzedaży korporacyjnej. Mimo że odnosiłam sukcesy w tej branży przez wiele lat, nie byłam szczęśliwa i w ostateczności odważyłam się, aby zmienić moje życie zawodowe i pasję.</p>
                <p className={classes.passion__paragraph}>Zawsze interesowałam się fotografią. Jak tylko zmieniłam zawód, kupiłam swój pierwszy aparat. Karierę moją rozpoczęłam jako zawodowa fotografka, fotografując zwykłe sceny uliczne i ludzi.</p>
                <p className={classes.passion__paragraph}>Jestem romantyczką i uwielbiam łączyć idealną perspektywę ze światłem. Moje ulubione uchwytywane momenty to romantyczne spojrzenia i śmiech, słodkie uściski i łzy radości.</p>
            <div className={classes.passion__button__wrapper}>
            <Button text={'Portfolio'} path={'/portfolio'} className={classes.passion__button}></Button>
            </div>
            </div>
        </div>
    )
}