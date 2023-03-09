import classes from '../addStyle.module.css'
import {useRef, useState, useEffect} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {PortfolioPropertiesToSendType} from '../../../Types/types';
import { useEditFirestoreDatabase } from '../../../hooks/useEditFirestoreDatabase';
type PortfolioElementType = { name:string, description:string,  id:string, date:number, url:string, orientation:number, pictures:{}[]} 
type AddAdminType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:PortfolioElementType}
export const AddPicture:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<PortfolioPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("Portfolio")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let sizeRef = useRef() as MutableRefObject<HTMLSelectElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0].name
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const addNewHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredOrientationRef: number = Number(orientationRef.current.value);
        const enteredSizenRef: number = Number(sizeRef.current.value);
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            url: pictureURL[0],
            date: new Date().getTime(),
            size: enteredSizenRef,
            orientation: enteredOrientationRef,
        })
        console.log(props.elementToEdit.pictures)
        namesRef.current.value = '';
        fileRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    useEffect(()=>{
        if(Object.keys(propertiesToSend).length !== 0 )
        props.elementToEdit.pictures.push(propertiesToSend);
        },[propertiesToSend, props.elementToEdit.pictures])
    console.log(props.elementToEdit)
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,props.elementToEdit, isPropertiesReady ,props.elementToEdit.id );
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
              {succesfullUpload &&  <p className={classes.admin__success}>Udało się dodać nowe zdjęcie ! </p>}
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}></button>
            <form className={classes.admin__wrapper} onSubmit={addNewHandler}>
                <label className={classes.admin__label} htmlFor='names'>Tytuł zdjęcia</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names" required />
                <label className={classes.admin__label} htmlFor='size'>Rozmiar zdjęcia w galerii</label>
                <select className={classes.admin__select} ref={sizeRef} name="size" id="size" required>
                    <option value={0} >Małe</option>
                    <option value={1}>Duże</option>
                    <option value={2}>Bardzo Duże</option>
                </select>
                <label className={classes.admin__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.admin__select} ref={orientationRef} name="orientation" id="orientation" required>
                    <option value={0} >Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.admin__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}