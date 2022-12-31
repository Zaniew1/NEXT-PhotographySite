import { ContactForm } from "./ContactForm";
import classes from './ContactFormWithText.module.css';
type ContactFormWithTextType = {
    text: string
}
export const ContactFormWithText=(props:ContactFormWithTextType)=>{
    return(
        <div className={classes.about__contact__wrapper}>
            <h2 className={classes.about__contact__header}>POROZMAWIAJMY O TWOIM WYMARZONYM WESELU!</h2>
            <ContactForm/>
        </div>
        )
}