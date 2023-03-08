
import classes from '../editStyle.module.css'
import {useEffect, useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {GalleryPropertiesToSendType} from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';
type GalleryElementType = {name:string, size:number, orientation: number, id:string, date:number, url:string};
type AddAdminType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:GalleryElementType }
export const EditGallery:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<GalleryPropertiesToSendType>({});
    const [databaseLocation] = useState<string>("Gallery");
    let idToSend = props.elementToEdit.id
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
    useEffect(()=>{
        namesRef.current.value = props.elementToEdit.name;
    },[ props.elementToEdit.name ])

    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const editHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredOrientationRef: number = Number(orientationRef.current.value);
        const enteredSizeRef: number = Number(sizeRef.current.value);
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        setIsPropertiesReady(true);
        props.elementToEdit.name = enteredNamesRef;
        pictureURL.length !== 0  ? props.elementToEdit.url = pictureURL[0]: props.elementToEdit.url;
        props.elementToEdit.size = enteredSizeRef
        props.elementToEdit.orientation = enteredOrientationRef
        setPropertiesToSend(props.elementToEdit)
        namesRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady ,idToSend );
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}></button>
            <form className={classes.admin__wrapper} onSubmit={editHandler}>
            <label className={classes.admin__label} htmlFor='names'>Tytuł zdjęcia</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  />
                <label className={classes.admin__label} htmlFor='size'>Rozmiar zdjęcia w galerii</label>
                <select className={classes.admin__select} ref={sizeRef} name="size" id="size" >
                    <option value={0}  >Małe</option>
                    <option value={1}>Duże</option>
                    <option value={2}>Bardzo Duże</option>
                </select>
                <label className={classes.admin__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.admin__select} ref={orientationRef} name="orientation" id="orientation" >
                    <option value={0}>Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.admin__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' />
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}


