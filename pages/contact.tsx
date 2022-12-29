import { ContactForm } from "../Components/Form/ContactForm";
import { Header } from './../Components/Header/Header';
import { Footer} from './../Components/Footer/Footer';

import classes from './contact.module.css';
import Image from 'next';

const Contact:React.FC = (props) => { return (
    <main>
      <Header/>
     <div className={classes.wrapper}>
        {/* <Image src="/../../public/img/1.jpg" alt="asd" layout="fill" objectFit="cover"/> */}
     </div>
     <div>
      <h2>
        KONTAKT
      </h2>
      <p>Każdego roku wykonuję niewielką liczbę wesel (równo 24!). Każda osoba i historia są wyjątkowe, dla tego chcę zwrócić szczególną uwagę na każdego klienta osobno, aby zagwarantować jakość mojej pracy i czasu.</p>
     </div>
     <ContactForm/>
     <Footer/>
    </main>
  );};


  export default Contact