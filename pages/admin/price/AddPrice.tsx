import classes from '../addStyle.module.css'
import {useRef, useState, useEffect } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {PricePropertiesToSendType} from '../../../Types/types';
import { useFirestoreDatabase } from '../../../hooks/useFirestoreDatabase';
import { AddAdminType } from '../../../Types/types';
export const AddPrice:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<PricePropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Price")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let priceRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>
    let contentRef = useRef() as MutableRefObject<HTMLTextAreaElement>
    let file1Ref = useRef() as MutableRefObject<HTMLInputElement>
    let file2Ref = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0]
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    const fileUploadHandler2 = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const file =  e.target?.files[0]
            setPictureFiles((prevState) => [...prevState, file])
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload, progress, setSuccesPictureUpload, setProgress} = useFirestorage(pictureFiles);
    const addNewHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredPriceRef: InputRef = priceRef.current.value.trim();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredContentRef: InputRef = contentRef.current.value.trim();
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
        props.update(props.updateCounter + 1);
    }
    useEffect(()=>{
        if(progress == 100 && succesPictureUpload == true){
            const turnOffSuccess = setTimeout(()=>{
                setProgress(0)
                setSuccesPictureUpload(false)
            },2000)
            return ()=> clearInterval(turnOffSuccess)
        }
    }, [succesPictureUpload,progress, setProgress, setSuccesPictureUpload ])
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    console.log(succesfullUpload)
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
            {succesfullUpload &&  <p className={classes.admin__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}>X</button>
            <form className={classes.admin__wrapper} onSubmit={addNewHandler}>
                <label className={classes.admin__label} htmlFor='names'>Nazwa Pakietu</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.admin__label} htmlFor='description'>Opis</label>
                <textarea className={classes.admin__input} ref={descriptionRef}  id="description"  style={{ height:"150px"}} required/>
                <label className={classes.admin__label} htmlFor='price'>Cena</label>
                <input className={classes.admin__input} ref={priceRef} type="text" id="price" required/>
                <label className={classes.admin__label} htmlFor='content'>Z czego się składa pakiet:</label>
                <textarea className={classes.admin__input} ref={contentRef} style={{ height:"150px"}} id="content" required/>
                <label className={classes.admin__label} htmlFor='file1'>Załącz zdjęcie nr 1</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={file1Ref} style={{border:'none'}} type="file" id="file1" accept='image/png, image/jpeg' required/>
                <label className={classes.admin__label} htmlFor='file2'>Załącz zdjęcie nr 2</label>
                <input className={classes.admin__input} onChange={fileUploadHandler2} ref={file2Ref} style={{border:'none'}} type="file" id="file2" accept='image/png, image/jpeg' required/>
                {progress !=0 && <p className={classes.admin__success}>{`Trwa upload zdjęcia (${Math.round(progress)})%`}</p>}
                {succesPictureUpload && <p className={classes.admin__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}