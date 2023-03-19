import classes from './AboutInformations.module.css';
import { CustomHeader } from '../UI/Texts/CustomHeader';
export const AboutInformations:React.FC = (): JSX.Element =>{
    return(
        <div className={classes.about__wrapper}>
            <div className={classes.about__overlap}>
                <CustomHeader customClass={classes.about__greetting} text={'CZEŚĆ! MAM NA IMIĘ Kamila! JESTEM FOTOGRAFEM ŚLUBNYM.'}/>
                <div className={classes.about__description}>
                    <div className={classes.about__upper__paragraph}>
                        <p className={classes.about__paragraph}>Bardzo często chodzę na wystawy i ciągle kształcę się w zdobywaniu nowych praktyk. Lubię oglądać filmy fabularne, pozwalają one mi odkrywać perspektywy snajlepszych fachowców. Ponadto, aby moje zdjęcia były profesjonalne i różnorodne, obserwuję wielu znanych fotografów mody.</p>
                        <p className={classes.about__paragraph}> Jako fotografka ślubnych imprez uważam, że powinnam pracować w różnych stylach. Czerpię inspiracje z fotografii reklamowych i mody oraz ze znanych prac wybitnych artystów, którzy dbają o grę światła w swoich pracach, takich jak Rembrandt.</p>
                    </div>
                    <p className={classes.about__paragraph}> Jestem przekonana, że Twoje zdjęcia - to Twoja spuścizna i że każdy, kogo fotografuję pozostawia dla siebie niezapomnianą pamiątkę.</p>
                </div>
                <div className={classes.about__facts}>
                    <div className={classes.about__fact}>
                        <p className={classes.about__title}>Ulubiony Kraj</p>
                        <p className={classes.about__answer}>Hiszpania</p>
                    </div>
                    <div className={classes.about__fact}>
                        <p className={classes.about__title}>Tajny talent</p>
                        <p className={classes.about__answer}>KiteSurfing</p>
                    </div>
                    <div className={classes.about__fact}>
                        <p className={classes.about__title}>Ulubiony Napój</p>
                        <p className={classes.about__answer}>Czerwone wino o delikatnym smaku owoców</p>
                    </div>
                </div>
            </div>
        </div>
    );
}