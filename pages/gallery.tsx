import { Header } from './../Components/Header/Header';
import { CustomHeader } from '../Components/UI/Texts/CustomHeader';
import classes from './gallery.module.css';
import { ContactFormWithText } from '../Components/Form/ContactFormWithText';
import { Footer } from '../Components/Footer/Footer';
import { Portfolio } from '../Components/MainPage/Portfolio/Portfolio';
import { GalleryPictures } from '../Components/GalleryPictures/GalleryPictures';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { GalleryElementType } from '../Types/types';
import { collection, getDocs } from 'firebase/firestore';
 const Gallery:React.FC<{data:GalleryElementType[]}> = (props):JSX.Element => { 
  return (
    <main>
      <Header black={true}/>
        <section className={classes.gallery}>
            <CustomHeader customClass={classes.gallery__header} text={'inspiracje fotografii ślubnej'}/>
            <p className={classes.gallery__paragraph}>Wyróżnić się jako fotograf ślubny może być bardzo trudne. Staram się, aby styl fotografii ślubnej był wyjątkowy i kreatywny dla każdej pary. Lubię robić reportaży o dniu ślubu, a także urzeczywistniać styl w mojej pracy.</p>
            <GalleryPictures data={props.data}/>
        </section>
        <ContactFormWithText text={'POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!'}/>
        <Portfolio/>
        <Footer/>
    </main>
  );
};
export async function getStaticProps(){
  const allCollection = collection(firebaseFirestore, "Gallery");
    const data = await getDocs(allCollection);
    const formattedData = data.docs.map(
      (doc): GalleryElementType => ({
        ...(doc.data() as GalleryElementType),
        id: doc.id,
      })
    );
    const sortedStoreData = [...formattedData].sort(
        (a: GalleryElementType, b: GalleryElementType) => a.date - b.date
      );
  return {
      props:{
         data: sortedStoreData
      },
      revalidate: 3600
  }
};
export default Gallery;