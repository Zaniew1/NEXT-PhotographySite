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
export const PriceChanger = () => {
    const [pictureFile,setPictureFile] = useState<any>(null);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("Price")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let priceRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let contentRef = useRef() as MutableRefObject<HTMLInputElement>
    let file1Ref = useRef() as MutableRefObject<HTMLInputElement>
    let file2Ref = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFile);
    
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
            url1: pictureURL,
            // url2: pictureURL2,
        })
        descriptionRef.current.value = '';
        priceRef.current.value = '';
        namesRef.current.value = '';
        contentRef.current.value = '';
        file1Ref.current.value = '';
        // file2Ref.current.value = '';

    }
    const deletePriceHandler = (id:string) =>{
    }
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
                <input className={classes.price__input} onChange={fileUploadHandler} ref={file2Ref} type="file" id="file2" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.price__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.price__button} type="submit">Dodaj</button>
            </form>
            {/* {props.data.map((prop:{id:string, properties:{url:string,name:string}}) =>{
                return (
                    <div className={classes.fetched__wrapper} key={prop.id}>
                        <p className={classes.fetched__paragraph}>{prop.properties.name}</p>
                        <div className={classes.fetched__icons} >
                            <div className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
                )
            })} */}
        </div>
    )
}