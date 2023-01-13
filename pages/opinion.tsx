import { Footer } from '../Components/Footer/Footer';
import { Header } from './../Components/Header/Header';
import {ContactFormWithText} from '../Components/Form/ContactFormWithText'
const Opinion = () => {
    return (
        <main>
          <Header/>
          <ContactFormWithText text={"POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!"}/>
          <Footer />
        </main>
      );
};
export default Opinion
