import classes from './OpinionChanger.module.css'; 
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect} from 'react'
import {useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFetchFirestore } from '../../../../hooks/useFetchFirestore';
import {OpinionPropertiesToSendType} from '../../../../Types/types'
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import {firebaseFirestore} from '../../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore'
export const OpinionChanger = (props: {data:{}}) => {
    // DO ZMIANY ANY ////
    const [pictureFile,setPictureFile] = useState<any>(null);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Opinion")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    const fetchedProperties = useFetchFirestore(databaseLocation);
    console.log(fetchedProperties)

    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFile);
    
    const addNewOpinionHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const date = new Date().getTime();
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            url: pictureURL,
            date: date
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        fileRef.current.value = '';

    }
    const deleteOpinionHandler = async (id:string) =>{
        await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
    }
    const editOpinionHandler = (element:any)=>{
        namesRef.current.value = element.name;
        descriptionRef.current.value = element.description;
        // fileRef.current.value = element.url;
        console.log(element)
    }


    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    useEffect(()=>{

    },[fetchedProperties,succesfullUpload])
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
            {fetchedProperties && fetchedProperties.map((el:any) =>{
                
                return (
                    <div className={classes.fetched__wrapper} key={Math.random()}>
                        <p className={classes.fetched__paragraph}>{el.name}</p>
                        <div className={classes.fetched__icons} >
                            <div onClick={()=>{deleteOpinionHandler(el.id)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div onClick={()=>{editOpinionHandler(el)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
                 ) 
             })}
        </div>
    )
}