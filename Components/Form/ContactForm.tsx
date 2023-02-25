import classes from './ContactForm.module.css'
import { MutableRefObject } from "react"
import {useRef} from 'react';
import { InputRef } from '../../Types/types';
export const ContactForm: React.FC= (): JSX.Element =>{
    const nameInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const emailInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const dateInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const placeInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const messageInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const formSubmitionHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        const enteredName:InputRef = nameInputRef.current.value;
        const enteredEmail:InputRef = emailInputRef.current.value;
        const enteredDate:InputRef = dateInputRef.current.value;
        const enteredPlace:InputRef = placeInputRef.current.value;
        const enteredMessage:InputRef = messageInputRef.current.value;
        console.log(enteredName, enteredEmail, enteredDate, enteredPlace, enteredMessage)
    }
    
    return (
    <form className={classes.form__wrapper} onSubmit={formSubmitionHandler}>
    <div className={classes.form__control}>
        <label className={classes.form__label} htmlFor='name'> Twoje Imię</label>
        <input className={classes.form__input} ref={nameInputRef} type='text' id='name' required/>
    </div>  
    <div className={classes.form__control}>
        <label className={classes.form__label} htmlFor='email'> Email</label>
        <input className={classes.form__input} ref={emailInputRef} type='email' id='email'  required/>
    </div>  
    <div className={classes.form__control}>
        <label className={classes.form__label} htmlFor='date'> Data</label>
        <input className={classes.form__input} ref={dateInputRef} type='date' id='date' required/>
    </div>  
   
    <div className={classes.form__control}>
        <label className={classes.form__label} htmlFor='location'> Lokalizacja</label>
        <input className={classes.form__input} ref={placeInputRef} type='text' id='location' required/>
    </div>  
    <div className={`${classes.form__control} ${classes.form__control__message}`}>
        <label className={classes.form__label} htmlFor='message'> Wiadomość</label>
        <input className={`${classes.form__input} ${classes.form__input__message}`} ref={messageInputRef} type='text' id='message' required/>
    </div>  
    <div className={classes.form__action}>
        <button className={classes.form__button} type='submit'>Napisz do mnie</button>
    </div>  
    </form>)
}