
import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { Questions } from './../Components/MainPage/Questions/Questions';
import {Opinions} from '../Components/MainPage/Opinions/Opinions'
import {Portfolio} from '../Components/MainPage/Portfolio/Portfolio';
import { useFetchFireStore } from './../hooks/useFetchFirestore';

export default function Home() {
  const mainSliderData = useFetchFireStore('MainSlider');
  
  return (
    <main>
      <Header black={false}/>
      <Slider data={mainSliderData} />
      <About />
      <Portfolio/>
      <Opinions/>
      <Questions/>
      <Footer />
    </main>
  );
}
