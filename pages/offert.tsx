import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import {ContactFormWithText} from '../Components/Form/ContactFormWithText'
const Offert = () => {
    return (
        <main>
          <Header/>
          <ContactFormWithText text={"POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!"}/>
          <Footer />
        </main>
      );
};
export default Offert