
import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { Questions } from './../Components/MainPage/Questions/Questions';
import {Opinions} from '../Components/MainPage/Opinions/Opinions'
import {Portfolio} from '../Components/MainPage/Portfolio/Portfolio';
import { useFetchFireStore } from './../hooks/useFetchFirestore';
import {useContext} from 'react';
import { DataContext } from '../Store/Data-context';
export default function Home() {
  const {setDataGallery, setDataOffer, setDataOpinion, setDataSlider, setDataPortfolio, dataSlider} = useContext(DataContext);
  const mainSliderData = useFetchFireStore('MainSlider');
  setDataSlider(mainSliderData);
  const galleryData = useFetchFireStore('Gallery');
  setDataGallery(galleryData);
  const offertData = useFetchFireStore('Offert');
  setDataOffer(offertData);
  const opinionData = useFetchFireStore('Opinion');
  setDataOpinion(opinionData);
  const portfolioData = useFetchFireStore('Portfolio');
  setDataPortfolio(portfolioData);
  console.log(dataSlider);
  return (
    <main>
      <Header black={false}/>
      <Slider/>
      <About />
      <Portfolio/>
      <Opinions/>
      <Questions/>
      <Footer />
    </main>
  );
}
