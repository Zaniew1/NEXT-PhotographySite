import classes from './LoginForm.module.css';
import React, { useState, useRef } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import  {firebaseAuth} from '../../../Firebase/firebase-config';
import { useContext } from 'react';
import {AuthContext} from '../../../Store/Auth-context'
type LoginError = boolean;
export const LoginForm:React.FC = () => {

    const emailRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>
    const [error, setError] = useState<LoginError>(false)
    const {loggedInFunction} = useContext(AuthContext);
    const loginHandler = (event:React.FormEvent) => {
        event.preventDefault();
        const enteredEmail:InputRef = emailRef.current.value;
        const enteredPassword:InputRef = passwordRef.current.value;
        console.log(enteredEmail, enteredPassword)
        signInWithEmailAndPassword(firebaseAuth, enteredEmail, enteredPassword)
        .then((userCredentials)=>{
            const user = userCredentials.user;
            setError(false);
            console.log(user);
            loggedInFunction(true);
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setError(true);
        });
    };

    return(
        <div className={classes.login}>
            <h2 className={classes.login__header}>Zaloguj się </h2>
            <form className={classes.login__form} onSubmit={loginHandler}>
                <label  className={classes.login__label}htmlFor='email' >Email</label>
                <input  className={classes.login__input}type='email' id='email' ref={emailRef}/>
                <label  className={classes.login__label}htmlFor='password'>Hasło</label>
                <input  className={classes.login__input}type='password' id='password' ref={passwordRef}/>
                <button className={classes.login__button} type='submit'>Zaloguj</button>
                {error && <span>Uwaga - nieprawidłowy email lub hasło</span>}
            </form>
        </div>
    )
}