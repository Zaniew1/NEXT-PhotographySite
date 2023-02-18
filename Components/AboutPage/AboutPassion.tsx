import classes from './AboutPassion.module.css';
import Image from 'next/image'
import { Button } from '../UI/Button';
import { BackgroundImage } from '../UI/BackgroundImage';

export const AboutPassion = () => {
    return(
        <div className={classes.passion__wrapper}>
            <h2 className={classes.passion__header}>HISTORIA DZIEWCZYNY Z PASJĄ I WIELOMA PODRÓŻAMI</h2>
            <div className={classes.passion__image__wrapper__one}>
            <Image
                src={'/../public/img/1.jpg'}
                alt={"Zdjęcie pary"}
                layout="fill"
                objectFit="cover"
                className={classes.single__image__one}
                />
            </div>
            <div className={classes.passion__image__wrapper__two}>
            <Image
                src={'/../public/img/2.jpg'}
                alt={"Zdjęcie pary"}
                layout="fill"
                objectFit="cover"
                className={classes.single__image__two}
                />
            </div>
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