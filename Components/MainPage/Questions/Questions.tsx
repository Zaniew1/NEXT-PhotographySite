import classes from './Questions.module.css';
import Image from "next/image";
import { ButtonCalendar } from '../../UI/ButtonCalendar';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export const Questions:React.FC  = () => {
    return(
        <section className={classes.questions__wrapper}>
            <h2 className={classes.questions__header}>MASZ PYTANIE? CZEKAM NA TWOJĄ WIADOMOŚĆ</h2>
            <div className={classes.questions__picture_wrapper}>
                <Image
                    src={'/../public/img/picture4.jpg'}
                    alt='Kamila Koziara'
                    layout="fill"
                    objectFit="cover"
                    className={classes.questions__image}
                    />
            </div>
            <p className={classes.questions__paragraph}>Bez względu na cel postaram się stworzyć piękne i ponadczasowe obrazy, które pasują do Państwa postaci. Większość czasu spędziłam w Pradze i Paryżu. Po zdobyciu doświadczenia w różnych częściach Europy fotografuję obecnie w Warszawie.</p>
            <div className={classes.questions__button__wrapper}>
            <ButtonCalendar text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
            </div>
        </section>
    )
}