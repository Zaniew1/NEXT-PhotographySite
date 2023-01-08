import classes from './OpinionChanger.module.css'; 
import {  doc, setDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseFirestore, firebaseStorage } from '../../../../Firebase/firebase-config';
import {useRef, useState, useEffect, ChangeEvent, InputHTMLAttributes} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
export const OpinionChanger = () => {
    // DO ZMIANY ANY ////
    const [pictureFile,setPictureFile] = useState<any>(null);
    const pictureURL = useFirestorage(pictureFile);
    const [nameOfData, setNameOfData ] = useState<string>('')
    const [propertiesToSend, setPropertiesToSend ] = useState({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("Opinion")

    const descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    const namesRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
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
    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, nameOfData)
    return (
        <div className={classes.opinion}>
            {succesfullUpload && <p>Udało się dodać nową opinię</p>}
            {error && <p>Niestety wystąpił błąd</p>}
            <form className={classes.opinion__wrapper} onSubmit={addNewOpinionHandler}>
                <label className={classes.opinion__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.opinion__input} ref={namesRef} type="text" id="names" />
                <label className={classes.opinion__label} htmlFor='description'>Opis</label>
                <input className={classes.opinion__input} ref={descriptionRef} type="text" id="description"/>
                <label className={classes.opinion__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.opinion__input} onChange={fileUploadHandler} type="file" id="file" accept='image/png, image/jpeg'/>
                <button className={classes.opinion__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}