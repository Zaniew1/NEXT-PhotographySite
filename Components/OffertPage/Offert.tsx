import { Header } from '../Header/Header'
import { CustomHeader } from '../UI/CustomHeader';
import { ContactFormWithText } from '../Form/ContactFormWithText';
import { OffertPackage } from './OffertPackage';
import { Footer } from '../Footer/Footer';
import classes from './Offert.module.css'

const OffertData = [
    {
        name: 'Pakiet - 8 godzin',
        price: 4000,
        description: "Pakiet ten jest przeznaczony dla małych wesel, które odbywają się na nieco zmniejszoną skalę niż tradycyjne wesela. Przedsięwzięcie takie może zaczynać się ceremonią, a kończyć obiadem weselnym. Może również zaczynać się od ubierania się panny młodej oraz pana młodego, a kończyć się ceremonią! Wybór należy do Państwa!" ,
        content: "- planowanie przed fotografowaniem" ,
        picture1: '/../public/img/picture1.jpg',
        picture2: '/../public/img/picture2.jpg',
    },
    {
        name: 'Pakiet - 12 godzin',
        price: 5000,
        description: "Pakiet ten jest przeznaczony dla małych wesel, które odbywają się na nieco zmniejszoną skalę niż tradycyjne wesela. Przedsięwzięcie takie może zaczynać się ceremonią, a kończyć obiadem weselnym. Może również zaczynać się od ubierania się panny młodej oraz pana młodego, a kończyć się ceremonią! Wybór należy do Państwa!" ,
        content: "-planowanie przed fotografowaniem; -planowanie przed fotografowaniem, " ,
        picture1: '/../public/img/picture3.jpg',
        picture2: '/../public/img/picture4.jpg',
    }
]

export const Offert:React.FC = ()=>{
    return(
        <section className={classes.offert}>
            <Header/>
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
                {OffertData.map(el=>{
                    return(
                        <OffertPackage key={el.name} name={el.name} description={el.description} content={el.content} price={el.price} picture1={el.picture1} picture2={el.picture2}/>
                    )
                })}
            </div>
            <ContactFormWithText text={"POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!"}/>
            <Footer />
        </section>
    )
}