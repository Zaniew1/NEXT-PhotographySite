
import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { Questions } from './../Components/MainPage/Questions/Questions';
import { ContactFormWithText } from '../Components/Form/ContactFormWithText';
import {Portfolio} from '../Components/MainPage/Portfolio/Portfolio';


export default function Home() {
  return (
    <main>
      <Header/>
      <Slider />
      <About />
      <Portfolio/>
      <Questions/>
      <Footer />
    </main>
  );
}
