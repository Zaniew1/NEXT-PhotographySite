import { BackgroundImage } from "../Components/UI/Images/BackgroundImage";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';
import classes from './about.module.css'
import { ContactFormWithText } from "../Components/Form/ContactFormWithText";
import { AboutInformations } from "../Components/AboutPage/AboutInformations";
import { AboutPassion } from "../Components/AboutPage/AboutPassion";
const About:React.FC = ():JSX.Element => {
    return (
        <main className={classes.about}>
          <Header black={false}/>
          <BackgroundImage
            classContainer={classes.about__background}
            src={'/static/images/kamila.jpg'} 
            alt={'Zdjęcie przedstawiające sesję Kamili Koziary podczas jej ślubu'} 
            />
              <p className={classes.about__greet}>CZEŚĆ! MAM NA IMIĘ KAMILA! JESTEM FOTOGRAFEM ŚLUBNYM.</p>
            <AboutInformations/>
            <AboutPassion/>
           <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
          <Footer/>
        </main>
      );
};
export default About;