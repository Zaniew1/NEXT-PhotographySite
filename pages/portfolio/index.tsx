import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import classes from './portfolio.module.css';
import { CustomHeader } from '../../Components/UI/Texts/CustomHeader';
import { ButtonCalendar } from '../../Components/UI/Buttons/ButtonCalendar';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { portfolioData } from '../../Data/Data';
import { PortfolioElementType } from '../../Types/types';

import { useFetchFirestore } from '../../hooks/useFetchFirestore';

import { SinglePortfolio } from '../../Components/SinglePortfolio/SinglePortfolio';
const Portfolio = () => {
  const fetchedProperties:PortfolioElementType[] | {}[]= useFetchFirestore('Price');
 


    return (
        <main>
          <Header black={true}/>
          <section className={classes.portfolio}>
            <CustomHeader customClass={classes.portfolio__header} text={'Portfolio'}/>
            <p className={classes.portfolio__paragraph}>Jako fotograf ślubny moją misją jest tworzenie pięknych, ponadczasowych i naturalnych fotografii, które można zachować na wieczność.</p>
            <p className={classes.portfolio__paragraph}>Z pasją chcę wyciągnąć rękę przez obiektyw, aby uchwycić wszystkie emocje tego wyjątkowego dnia. Skupiam się na wszystkim, od świetnych punktów po drobne szczegóły. Każdy element pomaga mi stworzyć wizualną historię, którą możecie Państwo przeglądać w nieskończoność. Cały dzień to historia.</p>
            <div className={classes.portfolio__portfolios}>

            {fetchedProperties.map((el,index)=>{
              const {name, url,  orientation} = el as PortfolioElementType
              return(
                <SinglePortfolio id={'/portfolio/'+name.replace(/ /g,'')} key={name.replace(" ", "")+index} url={url} orientation={orientation} name={name} index={index} />
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
export default Portfolio
