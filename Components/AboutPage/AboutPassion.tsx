import classes from './AboutPassion.module.css';
import Image from 'next/image'
import { Button } from '../UI/Button';
import { BackgroundImage } from '../UI/BackgroundImage';
export const AboutPassion = () => {
    return(
        <div>
            <h2 className={classes.passion__header}>HISTORIA DZIEWCZYNY Z PASJĄ I WIELOMA PODRÓŻAMI</h2>
            <div className={classes.passion__image__wrap}>
                {/* <BackgroundImage classContainer={classes.passion__image} src={'/img/1.jpg'} alt={'Kamila kkk'}  /> */}
            </div>
            <p className={classes.passion__paragraph}>Zanim zostałam fotografką, pracowałam w sektorze sprzedaży korporacyjnej. Mimo że odnosiłam sukcesy w tej branży przez wiele lat, nie byłam szczęśliwa i w ostateczności odważyłam się, aby zmienić moje życie zawodowe i pasję.</p>
            <p className={classes.passion__paragraph}>Zawsze interesowałam się fotografią. Jak tylko zmieniłam zawód, kupiłam swój pierwszy aparat. Karierę moją rozpoczęłam jako zawodowa fotografka, fotografując zwykłe sceny uliczne i ludzi.</p>
            <p className={classes.passion__paragraph}>Jestem romantyczką i uwielbiam łączyć idealną perspektywę ze światłem. Moje ulubione uchwytywane momenty to romantyczne spojrzenia i śmiech, słodkie uściski i łzy radości.</p>

        </div>
    )
}