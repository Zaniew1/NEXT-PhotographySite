import { Header } from '../Header/Header'
import { CustomHeader } from '../UI/Texts/CustomHeader';
import { ContactFormWithText } from '../Form/ContactFormWithText';
import { OffertPackage } from './OffertPackage';
import { Footer } from '../Footer/Footer';
import { OffertData } from '../../Data/Data';
import classes from './OffertPage.module.css'
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { PriceElementType } from '../../Types/types';
export const OffertPage : React.FC = () : JSX.Element =>{
    const fetchedProperties:PriceElementType[] | {}[]= useFetchFirestore('Price');

    return(
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
                {fetchedProperties.map((el,index)=>{
                    const {name, description, content, price, url1, url2} = el as PriceElementType
                    return(
                        <OffertPackage index={index} key={name} name={name} description={description} content={content} price={price} picture1={url1} picture2={url2}/>
                    )
                })}
            </div>
            <ContactFormWithText text={"POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!"}/>
            <Footer />
        </section>
    )
}