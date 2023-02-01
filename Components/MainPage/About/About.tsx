import classes from './About.module.css';
import Image from "next/image";
import { Button } from '../../UI/Button';
import { useScrollChecker } from '../../../hooks/useScrollChecker';

export const About:React.FC  = () => {
    return(
        <section className={classes.about__wrapper}>
            <div className={classes.about__margin}>

                <h2 className={classes.about__header}>CZEŚĆ! MAM NA IMIĘ DINA. JESTEM FOTOGRAFEM ŚLUBNYM W WARSZAWIE.</h2>
                <div className={classes.about__picture__wrapper}>
                    <Image
                        src={'/../public/img/picture2.jpg'}
                        alt='Kamila Koziara'
                        layout="fill"
                        objectFit="cover"
                        className={classes.about__image}
                        />
                    
                </div>
                <div className={classes.about__picture__wrapper__two}>
                    <Image
                        src={'/../public/img/picture3.jpg'}
                        alt='Kamila Koziara'
                        layout="fill"
                        objectFit="cover"
                        className={classes.about__image}
                        />
                    
                </div>
                <div className={classes.about__content}>
                    <p className={classes.about__paragraph}>Podróżowałam po całym świecie fotografując wesela, obecnie jestem fotografką w Warszawie!Jako fotografka ślubnych imprez uważam, że powinnam pracować w różnych stylach. Czerpię inspiracje z fotografii reklamowych i mody oraz ze znanych prac wybitnych artystów, którzy dbają o grę światła w swoich pracach, takich jak Rembrant.</p>
                    <div className={classes.about__button__wrapper}>
                        <Button text={'O mnie'} path={'/about'} className={classes.about__button}></Button>
                    </div>
                </div>
            </div>
        </section>
    )
}