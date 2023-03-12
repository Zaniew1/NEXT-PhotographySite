import classes from '../addStyle.module.css'
import {useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {PricePropertiesToSendType} from '../../../Types/types';
import { useFirestoreDatabase } from '../../../hooks/useFirestoreDatabase';
import { AddAdminType } from '../../../Types/types';
export const AddPortfolio:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<PricePropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Portfolio");
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let contentRef = useRef() as MutableRefObject<HTMLInputElement>
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0];
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const addNewHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim();
        const enteredOrientationRef: InputRef = orientationRef.current.value;
        const enteredContentRef: InputRef = contentRef.current.value.trim();

        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            orientation:enteredOrientationRef,
            content: enteredContentRef,
            url: pictureURL[0],
            date: new Date().getTime(),
            pictures: []
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        fileRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
              {succesfullUpload &&  <p className={classes.admin__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}></button>
            <form className={classes.admin__wrapper} onSubmit={addNewHandler}>
                <label className={classes.admin__label} htmlFor='names'>Nazwa Portfolio</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.admin__label} htmlFor='description'>Opis</label>
                <input className={classes.admin__input} ref={descriptionRef} type="text" id="description"  required/>
                <label className={classes.admin__label} htmlFor='content'>Nagłówek portfolio</label>
                <input className={classes.admin__input} ref={contentRef} type="text" id="content"  required/>
                <label className={classes.admin__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.admin__select} ref={orientationRef} name="orientation" id="orientation" required>
                    <option value={0} >Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.admin__label} htmlFor='file1'>Załącz zdjęcie nr 1</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.admin__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}