import classes from './OpinionChanger.module.css'; 
import {  doc, setDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseFirestore, firebaseStorage } from '../../../../Firebase/firebase-config';
import {useRef, useState, useEffect, ChangeEvent, InputHTMLAttributes} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import {OpinionPropertiesToSendType} from '../../../../Types/types'
export const OpinionChanger = () => {
    // DO ZMIANY ANY ////
    const [pictureFile,setPictureFile] = useState<any>(null);
    const [nameOfData, setNameOfData ] = useState<string>('')
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("Opinion")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFile);
    
    const addNewOpinionHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        setNameOfData(enteredNamesRef);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            url: pictureURL
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        fileRef.current.value = '';

    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, nameOfData)
    return (
        <div className={classes.opinion}>
            {succesfullUpload &&  <p className={classes.opinion__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.opinion__success}>Niestety wystąpił błąd ! </p>}
            <form className={classes.opinion__wrapper} onSubmit={addNewOpinionHandler}>
                <label className={classes.opinion__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.opinion__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.opinion__label} htmlFor='description'>Opis</label>
                <input className={classes.opinion__input} ref={descriptionRef} type="text" id="description" required/>
                <label className={classes.opinion__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.opinion__input} onChange={fileUploadHandler} ref={fileRef} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.opinion__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.opinion__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}