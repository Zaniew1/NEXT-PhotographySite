import classes from './Questions.module.css';
import { ButtonCalendar } from '../../UI/Buttons/ButtonCalendar';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { CustomImage } from '../../UI/Images/CustomImage';

export const Questions:React.FC  = ():JSX.Element => {
    return(
        <section className={classes.questions__wrapper}>
            <div className={classes.questions__width}>
                <h2 className={classes.questions__header__mobile}>MASZ PYTANIE? CZEKAM NA TWOJĄ WIADOMOŚĆ</h2>
                <CustomImage customClass={classes.questions__picture__wrapper} src={'/static/images/picture4.jpg'} alt={'Kamila Koziara'}/>
                <div className={classes.questions__content}>
                    <h2 className={classes.questions__header__desktop}>MASZ PYTANIE? CZEKAM NA TWOJĄ WIADOMOŚĆ</h2>
                    <p className={classes.questions__paragraph}>Bez względu na cel postaram się stworzyć piękne i ponadczasowe obrazy, które pasują do Państwa postaci. Większość czasu spędziłam w Pradze i Paryżu. Po zdobyciu doświadczenia w różnych częściach Europy fotografuję obecnie w Warszawie.</p>
                    <div className={classes.questions__button__wrapper}>
                    <ButtonCalendar black={true} text="Sprawdź datę" fontAwesome={faCalendar} path="/contact"/>
                    </div>
                </div>
            </div>
        </section>
    )
}