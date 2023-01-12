import classes from './OpinionChanger.module.css'; 
import {  doc, setDoc } from "firebase/firestore"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useFetchFirebaseDatabase } from '../../../../hooks/useFetchFirebaseDatabase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
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
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            url: pictureURL
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        fileRef.current.value = '';

    }
    const deleteOpinionHandler = (id:string) =>{
        console.log(id)
    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    const fetchedProperties = useFetchFirebaseDatabase(databaseLocation);
    console.log(fetchedProperties)
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
            {fetchedProperties && fetchedProperties.map((prop:{id:string, properties:{url:string,name:string}}) =>{
                return (
                    <div className={classes.fetched__wrapper} key={prop.id}>
                        <p className={classes.fetched__paragraph}>{prop.properties.name}</p>
                        <div className={classes.fetched__icons} >
                            <div className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}