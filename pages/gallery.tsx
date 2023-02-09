import { Footer } from '../Components/Footer/Footer';
import { Slider } from "../Components/MainPage/Slider/Slider";
import { About } from '../Components/MainPage/About/About';
import { Header } from './../Components/Header/Header';
import { CustomHeader } from './../Components/UI/CustomHeader';
import classes from './gallery.module.css';
import { useFetchFireStore } from '../hooks/useFetchFirestore';
 const Gallery = () => { 
  const galleryData = useFetchFireStore('Gallery');
  console.log(galleryData);
  return (
    <main>
      <Header black={true}/>
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
        </section>
    </main>
  );};
export default Gallery;