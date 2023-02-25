import { Header } from './../Components/Header/Header';
import { CustomHeader } from './../Components/UI/CustomHeader';
import classes from './gallery.module.css';
import { galleryData } from '../Data/Data';
import { ContactFormWithText } from '../Components/Form/ContactFormWithText';
import { Footer } from '../Components/Footer/Footer';
import { Portfolio } from '../Components/MainPage/Portfolio/Portfolio';
import { GalleryPictures } from '../Components/GalleryPictures/GalleryPictures';
 const Gallery:React.FC = ():JSX.Element => { 
  return (
    <main>
      <Header black={true}/>
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
            <GalleryPictures data={galleryData}/>
        </section>
        <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
        <Portfolio/>
        <Footer/>
    </main>
  );
};
export default Gallery;