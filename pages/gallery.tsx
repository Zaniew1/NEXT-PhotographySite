import { Header } from './../Components/Header/Header';
import { CustomHeader } from './../Components/UI/CustomHeader';
import classes from './gallery.module.css';
import {useContext} from 'react';
import { DataContext } from '../Store/Data-context';
 const Gallery = () => { 
  const {dataGallery} = useContext(DataContext);
  console.log(dataGallery);
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