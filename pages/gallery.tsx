import { Header } from './../Components/Header/Header';
import { CustomHeader } from '../Components/UI/Texts/CustomHeader';
import classes from './gallery.module.css';
import { ContactFormWithText } from '../Components/Form/ContactFormWithText';
import { Footer } from '../Components/Footer/Footer';
import { Portfolio } from '../Components/MainPage/Portfolio/Portfolio';
import { GalleryPictures } from '../Components/GalleryPictures/GalleryPictures';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { GalleryElementType, PortfolioElementType } from '../Types/types';
import { collection, getDocs } from 'firebase/firestore';
 const Gallery:React.FC<{gallery:GalleryElementType[], portfolio: PortfolioElementType[]}> = (props):JSX.Element => { 
  return (
    <main>
      <Header black={true}/>
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
            <GalleryPictures data={props.gallery}/>
        </section>
        <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
        <Portfolio data={props.portfolio}/>
        <Footer/>
    </main>
  );
};
export async function getStaticProps(){
  const galleryCollection = collection(firebaseFirestore, "Gallery");
  const portfolioCollection = collection(firebaseFirestore, "Portfolio");
    const dataGallery = await getDocs(galleryCollection);
    const dataPortfolio = await getDocs(portfolioCollection);
    const formattedDataGallery = dataGallery.docs.map(
      (doc): GalleryElementType => ({
        ...(doc.data() as GalleryElementType),
        id: doc.id,
      })
    );
    const formattedDataPortfolio = dataPortfolio.docs.map(
      (doc): PortfolioElementType => ({
        ...(doc.data() as PortfolioElementType),
        id: doc.id,
      })
    );
    const sortedStoreDataGallery = [...formattedDataGallery].sort(
        (a: GalleryElementType, b: GalleryElementType) => a.date - b.date
      );
      const sortedStoreDataPortfolio = [...formattedDataPortfolio].sort(
        (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
      );
  return {
      props:{
         gallery: sortedStoreDataGallery,
         portfolio: sortedStoreDataPortfolio
      },
      revalidate: 60
  }
};
export default Gallery;