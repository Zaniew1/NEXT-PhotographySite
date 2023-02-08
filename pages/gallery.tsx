import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { GalleryPage } from '../Components/GalleryPage/GalleryPage';
 const Gallery = () => { return (
    <main>
      <Header black={true}/>
      <GalleryPage/>
    </main>
  );};
export default Gallery;