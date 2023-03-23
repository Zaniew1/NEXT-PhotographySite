import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import classes from './portfolio.module.css';
import { CustomHeader } from '../../Components/UI/Texts/CustomHeader';
import { ButtonCalendar } from '../../Components/UI/Buttons/ButtonCalendar';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { PortfolioElementType } from '../../Types/types';
import { collection, getDocs } from 'firebase/firestore';
import { firebaseFirestore } from './../../Firebase/firebase-config';

import { SinglePortfolio } from '../../Components/SinglePortfolio/SinglePortfolio';
const Portfolio:React.FC<{portfolio: PortfolioElementType[]}> = (props):JSX.Element => {


    return (
        <main>
          <Header black={true}/>
          <section className={classes.portfolio}>
            <CustomHeader customClass={classes.portfolio__header} text={'Portfolio'}/>
            <p className={classes.portfolio__paragraph}>Jako fotograf ślubny moją misją jest tworzenie pięknych, ponadczasowych i naturalnych fotografii, które można zachować na wieczność.</p>
            <p className={classes.portfolio__paragraph}>Z pasją chcę wyciągnąć rękę przez obiektyw, aby uchwycić wszystkie emocje tego wyjątkowego dnia. Skupiam się na wszystkim, od świetnych punktów po drobne szczegóły. Każdy element pomaga mi stworzyć wizualną historię, którą możecie Państwo przeglądać w nieskończoność. Cały dzień to historia.</p>
            <div className={classes.portfolio__portfolios}>

            {props.portfolio?.map((el,index)=>{
              return(
                <SinglePortfolio id={'/portfolio/'+el.id} key={el.id} url={el.url} orientation={el.orientation} name={el.name} index={index} />
                )
              })}
              </div>
            <CustomHeader customClass={classes.portfolio__header} text={'Fotografia ślubna'}/>
            <p className={classes.portfolio__paragraph}>Od pierwszego pocałunku do pierwszego tańca, od przysięgi po przemówienia, są to chwile, których nigdy nie da się zapomnieć. Są także takie momenty, których nigdy nie da się zobaczyć pod czas gwaru weselnego. Staram się to wszystko ogarnąć, uchwycić każdą chwilę.</p>
            <div className={classes.portfolio__button__wrap}>
                <ButtonCalendar black={false} text="Sprawdź Datę" fontAwesome={faCalendar} path="/contact"/>
            </div>

          </section>
          <Footer />
        </main>
      );
};
export async function getStaticProps(){
    const dataPortfolio = await getDocs(collection(firebaseFirestore, "Portfolio"));
   
    const formattedDataPortfolio = dataPortfolio.docs.map(
      (doc): PortfolioElementType => ({
        ...(doc.data() as PortfolioElementType),
        id: doc.id,
      })
    );
  
      const sortedStoreDataPortfolio = [...formattedDataPortfolio].sort(
        (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
      );
  return {
      props:{
         portfolio: sortedStoreDataPortfolio
      },
      revalidate: 5
  }
};


export default Portfolio
