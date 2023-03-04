import classes from './OpinionChanger.module.css'; 
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFetchFirestore } from '../../../../hooks/useFetchFirestore';
import {OpinionPropertiesToSendType} from '../../../../Types/types'
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import {firebaseFirestore} from '../../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore'
export const PortfolioChanger = () => {
    // DO ZMIANY ANY ////
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Portfolio")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0].name
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const addNewOpinionHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredOrientationRef: InputRef = orientationRef.current.value;
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            orientation: enteredOrientationRef,
            url: pictureURL[0],
            date: new Date().getTime(),
            pictures:[]
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        fileRef.current.value = '';
        setFetchedData(updateFetchedData+1);
    }
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    const editElementHandler = (element:OpinionElementType)=>{
        if(element.name !== undefined && element.description !== undefined){
            namesRef.current.value = element.name;
            descriptionRef.current.value = element.description;
        }
        // fileRef.current.value = element.url;
        setFetchedData(updateFetchedData+1);
    }
    
    type OpinionElementType = {name?:string, description?: string, id?:string, date?:number, url?:string};
    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    console.log(fetchedProperties)
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    return (
        <div className={classes.opinion}>
            {succesfullUpload &&  <p className={classes.opinion__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.opinion__success}>Niestety wystąpił błąd ! </p>}
            <form className={classes.opinion__wrapper} onSubmit={addNewOpinionHandler}>
                <label className={classes.opinion__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.opinion__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.opinion__label} htmlFor='description'>Opis</label>
                <input className={classes.opinion__input} ref={descriptionRef} type="text" id="description" required/>
                <label className={classes.gallery__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.gallery__select} ref={orientationRef} name="orientation" id="orientation" required>
                    <option value={0} >Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.opinion__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.opinion__input} onChange={fileUploadHandler} ref={fileRef} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.opinion__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.opinion__button} type="submit">Dodaj</button>
            </form>
            {(Array.isArray(fetchedProperties)) && fetchedProperties.length !== 0 && (Object.keys(fetchedProperties[0]).length !== 0 ) && fetchedProperties.map((element:OpinionElementType) =>{
                const {name, id, url, date, description} = element as OpinionElementType;
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <p className={classes.fetched__paragraph}>{name}</p>
                        <div className={classes.fetched__icons} >
                            <div onClick={()=>{deleteElementHandler(id)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div onClick={()=>{editElementHandler(element)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
                 ) 
             })}
        </div>
    )
}
