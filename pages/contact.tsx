import { ContactForm } from "../Components/Form/ContactForm";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';
import { BackgroundImage } from "../Components/UI/BackgroundImage";

import classes from './contact.module.css';
import Image from 'next';

const Contact:React.FC = (props) => { return (
    <main>
      <Header/>
      <BackgroundImage classContainer={classes.contact__background} src={'/img/3.jpg'} alt={'Zdjęcie przedstawiające zakochaną parę'} text={''}/>
     <section className={classes.contact__wrapper}>
      <h2 className={classes.contact__header}>
        KONTAKT
      </h2>
      <p className={classes.contact__description}>Każdego roku wykonuję niewielką liczbę wesel (równo 24!). Każda osoba i historia są wyjątkowe,
         dla tego chcę zwrócić szczególną uwagę na każdego 
        klienta osobno, aby zagwarantować jakość mojej pracy i czasu.</p>
        <div  className={classes.contact__contact}>
          <div className={classes.contact__wrap}>
            <p className={classes.contact__paragraph}>Email</p>
            <p className={classes.contact__content}>ahjbsdiasd@gmail.com</p>
          </div>
          <div className={classes.contact__wrap}>
            <p className={classes.contact__paragraph}>Telefon</p>
            <p className={classes.contact__content}>+ 48 124 141 981</p>
          </div>
        </div>
    
     <ContactForm/>
     </section>
     <Footer/>
    </main>
  );};


  export default Contact