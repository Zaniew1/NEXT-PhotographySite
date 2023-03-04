import classes from './PriceChanger.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import {useRef, useState,  InputHTMLAttributes} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import {OpinionPropertiesToSendType} from '../../../../Types/types'
import { useFetchFirestore } from '../../../../hooks/useFetchFirestore';
import {deleteDoc, doc} from 'firebase/firestore'
import {firebaseFirestore} from '../../../../Firebase/firebase-config';

type PriceElementType = {id?:string, content?:string, description?: string, name?:string, price?:number, url1?:string, url2?:string}
export const PriceChanger = () => {
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Price")
    const [updateFetchedData,setFetchedData] = useState<number>(0);

    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let priceRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let contentRef = useRef() as MutableRefObject<HTMLInputElement>
    let file1Ref = useRef() as MutableRefObject<HTMLInputElement>
    let file2Ref = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state pictureFiles
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const file =  e.target?.files[0].name;
            setPictureFiles((prevState) => [...prevState, file])
        }
    }
    const fileUploadHandler2 = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const file =  e.target?.files[0].name
            setPictureFiles((prevState) => [...prevState, file])
        }
    }
    // Uploadowanie zdjęcia , zwraca array 
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles );
    const addNewPriceHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredPriceRef: InputRef = namesRef.current.value.trim();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredContentRef: InputRef = namesRef.current.value.trim();
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            price: enteredPriceRef,
            description: enteredDescriptionRef,
            content: enteredContentRef,
            url1: pictureURL[0],
            url2: pictureURL[1],
            date: new Date().getTime()
        })
        descriptionRef.current.value = '';
        priceRef.current.value = '';
        namesRef.current.value = '';
        contentRef.current.value = '';
        file1Ref.current.value = '';
        file2Ref.current.value = '';
        setFetchedData(updateFetchedData+1);
    }
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    const editElementHandler = (element:PriceElementType)=>{
        if(element.name !== undefined && element.description !== undefined){
            namesRef.current.value = element.name;
            descriptionRef.current.value = element.description;
        }
        // fileRef.current.value = element.url;
        setFetchedData(updateFetchedData+1);
    }
    
    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    return (
        <div className={classes.price}>
            {succesfullUpload &&  <p className={classes.price__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.price__success}>Niestety wystąpił błąd ! </p>}
            <form className={classes.price__wrapper} onSubmit={addNewPriceHandler}>
                <label className={classes.price__label} htmlFor='names'>Nazwa Pakietu</label>
                <input className={classes.price__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.price__label} htmlFor='description'>Opis</label>
                <input className={classes.price__input} ref={descriptionRef} type="text" id="description"  required/>
                <label className={classes.price__label} htmlFor='price'>Cena</label>
                <input className={classes.price__input} ref={priceRef} type="text" id="price" required/>
                <label className={classes.price__label} htmlFor='content'>Z czego się składa pakiet:</label>
                <input className={classes.price__input} ref={contentRef} type="text" id="content" required/>
                <label className={classes.price__label} htmlFor='file1'>Załącz zdjęcie nr 1</label>
                <input className={classes.price__input} onChange={fileUploadHandler} ref={file1Ref} type="file" id="file1" accept='image/png, image/jpeg' required/>
                <label className={classes.price__label} htmlFor='file2'>Załącz zdjęcie nr 2</label>
                <input className={classes.price__input} onChange={fileUploadHandler2} ref={file2Ref} type="file" id="file2" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.price__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.price__button} type="submit">Dodaj</button>
            </form>
            {fetchedProperties.map((el:PriceElementType) =>{
                return (
                    <div className={classes.fetched__wrapper} key={el.id}>
                        <p className={classes.fetched__paragraph}>{el.name}</p>
                        <div className={classes.fetched__icons} >
                        <div onClick={()=>{deleteElementHandler(el.id)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div onClick={()=>{editElementHandler(el)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}