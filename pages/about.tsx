import { BackgroundImage } from "../Components/UI/BackgroundImage";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';
import classes from './about.module.css'
import { ContactForm } from "../Components/Form/ContactForm";
import { AboutInformations } from "../Components/AboutPage/AboutInformations";
const About = () => {
    return (
        <main>
          <Header/>
          <BackgroundImage
            classContainer={classes.about__background}
            src={'/img/3.jpg'} 
            alt={'Zdjęcie przedstawiające zakochaną parę'} 
            />
              <p className={classes.about__greet}>CZEŚĆ! MAM NA IMIĘ Kamila! JESTEM FOTOGRAFEM ŚLUBNYM.</p>
            <AboutInformations/>
            <div className={classes.about__contact__wrapper}>
              <h2 className={classes.about__contact__header}>POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!</h2>
              <ContactForm/>
            </div>
          <Footer/>
        </main>
      );
};
export default About;