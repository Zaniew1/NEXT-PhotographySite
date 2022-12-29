import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
 const Gallery = () => { return (
    <main>
      <Header/>
      <Slider />
      <About />
      <Footer />
    </main>
  );};
export default Gallery;