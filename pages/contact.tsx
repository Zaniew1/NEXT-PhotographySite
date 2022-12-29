import { ContactForm } from "../Components/Form/ContactForm";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';

import classes from './contact.module.css';
import Image from 'next';

const Contact:React.FC = (props) => { return (
    <main>
      <Header/>
     <div className={classes.contact__background}>
        {/* <Image src="/../../public/img/1.jpg" alt="asd" layout="fill" objectFit="cover"/> */}
     </div>
     <div className={classes.contact__contact}>
      <h2 className={classes.contact__header}>
        KONTAKT
      </h2>
      <p>Każdego roku wykonuję niewielką liczbę wesel (równo 24!). Każda osoba i historia są wyjątkowe,
         dla tego chcę zwrócić szczególną uwagę na każdego 
        klienta osobno, aby zagwarantować jakość mojej pracy i czasu.</p>
        <div>
          <div className={classes.contact__contact}>
            <p>Email</p>
            <p>ahjbsdiasd@gmail.com</p>
          </div>
          <div>
            <p>Telefon</p>
            <p>124141981249</p>
          </div>
        </div>
     </div>
     <ContactForm/>
     <Footer/>
    </main>
  );};


  export default Contact