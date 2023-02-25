import { ContactForm } from "./ContactForm";
import classes from './ContactFormWithText.module.css';
type ContactFormWithTextType = {
    text: string
}
export const ContactFormWithText:React.FC<ContactFormWithTextType>=(props):JSX.Element=>{
    return(
        <div className={classes.about__contact__wrapper}>
            <h2 className={classes.about__contact__header}>{props.text}</h2>
            <ContactForm/>
        </div>
        )
}