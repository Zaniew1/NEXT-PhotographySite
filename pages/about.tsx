import { BackgroundImage } from "../Components/UI/BackgroundImage";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';
import classes from './about.module.css'
import { ContactFormWithText } from "../Components/Form/ContactFormWithText";
import { AboutInformations } from "../Components/AboutPage/AboutInformations";
import { AboutPassion } from "../Components/AboutPage/AboutPassion";
const About:React.FC = ():JSX.Element => {
    return (
        <main>
          <Header black={true}/>
          <BackgroundImage
            classContainer={classes.about__background}
            src={'/img/3.jpg'} 
            alt={'Zdjęcie przedstawiające zakochaną parę'} 
            />
              <p className={classes.about__greet}>CZEŚĆ! MAM NA IMIĘ Kamila! JESTEM FOTOGRAFEM ŚLUBNYM.</p>
            <AboutInformations/>
            <AboutPassion/>
           <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
          <Footer/>
        </main>
      );
};
export default About;