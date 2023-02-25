import classes from './About.module.css';
import { Button } from '../../UI/Button';
import { CustomImage } from '../../UI/CustomImage';
export const About:React.FC =():JSX.Element => {
    return(
        <section className={classes.about__wrapper}>
            <div className={classes.about__margin}>
                <h2 className={classes.about__header}>CZEŚĆ! MAM NA IMIĘ DINA. JESTEM FOTOGRAFEM ŚLUBNYM W WARSZAWIE.</h2>
                <CustomImage customClass={classes.about__picture__wrapper} src={'/../public/img/1.jpg'} alt={"Zdjęcie pary"}/>
                <CustomImage customClass={classes.about__picture__wrapper__two} src={'/../public/img/2.jpg'} alt={"Zdjęcie pary"}/>
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