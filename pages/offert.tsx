import { Header } from '../Components/Header/Header';
import { CustomHeader } from '../Components/UI/Texts/CustomHeader';
import { ContactFormWithText } from '../Components/Form/ContactFormWithText';
import { OffertPackage } from '../Components/OffertPage/OffertPackage';
import { Footer } from '../Components/Footer/Footer';
import classes from './offert.module.css'
import { PriceElementType } from '../Types/types';
import { firebaseFirestore } from './../Firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
const Offert:React.FC<{data:PriceElementType[]}> = (props):JSX.Element => {

    return (
      <section className={classes.offert}>
      <Header black={true}/>
      <div className={classes.offert__content}>
          <CustomHeader customClass={classes.offert__header} text={"ślubna oferta Fotograficzna"}/>
          <p className={classes.offert__paragraph}>
              Szukasz doświadczonego fotografa w rewelacyjnej cenie?
              Znalazłeś właśnie mnie! Czego możesz się spodziewać? Każdy pakiet rozpoczyna się od osobistej
              konsultacji przed planowaniem sesji. Od pierwszego dnia jestem w 100% skoncentrowana na Tobie. 
              Będziemy współpracować tak, aby wszystko było jak najlepiej zaplanowane i wykonane poprawnie </p>
          <p className={classes.offert__paragraph}>
              Prawdopodobnie wybierasz fotografa ślubnego po raz pierwszy i 
              wiem, jak trudna, a jednocześnie ważna jest ta decyzja.
          </p>
      </div>
      <div className={classes.offert__packages}>
          {props.data.map((el,index)=>{
              const {name, description, content, price, url1, url2} = el as PriceElementType
              return(
                  <OffertPackage index={index} key={name} name={name} description={description} content={content} price={price} picture1={url1} picture2={url2}/>
              )
          })}
      </div>
      <ContactFormWithText text={"POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!"}/>
      <Footer />
  </section>
      );
};
export async function getStaticProps(){
  const allCollection = collection(firebaseFirestore, "Price");
    const data = await getDocs(allCollection);
    const formattedData = data.docs.map(
      (doc): PriceElementType => ({
        ...(doc.data() as PriceElementType),
        id: doc.id,
      })
    );
    const sortedStoreData = [...formattedData].sort(
        (a: PriceElementType, b: PriceElementType) => a.date - b.date
      );
  return {
      props:{
         data: sortedStoreData
      },
      revalidate: 60
  }
};

export default Offert