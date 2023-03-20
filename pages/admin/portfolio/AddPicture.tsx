import classes from '../addStyle.module.css'
import {useRef, useState, useEffect} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import { useEditFirestoreDatabase } from '../../../hooks/useEditFirestoreDatabase';
import { EditPortflioType } from '../../../Types/types';
type PicturesType = {name: string,size: number,orientation: number,date: number, url: string,}
export const AddPicture:React.FC<EditPortflioType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<PicturesType>({name: '',size: 0,orientation: 0,date: 0, url: '',})
    const [databaseLocation] = useState<string>("Portfolio")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let sizeRef = useRef() as MutableRefObject<HTMLSelectElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0]
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload, progress, setProgress} = useFirestorage(pictureFiles);
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
        namesRef.current.value = '';
        fileRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    useEffect(()=>{
        if(progress == 100 && succesPictureUpload == true){
            const turnOffSuccess = setTimeout(()=>{
                setProgress(0)
            },2000)
            return ()=> clearInterval(turnOffSuccess)
        }
    }, [succesPictureUpload,progress, setProgress ])
    useEffect(()=>{
        if(propertiesToSend.url != "" )
        props.elementToEdit.pictures.push(propertiesToSend);
        },[propertiesToSend, props.elementToEdit.pictures])
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,props.elementToEdit, isPropertiesReady ,props.elementToEdit.id );
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
              {succesfullUpload &&  <p className={classes.admin__success}>Udało się dodać nowe zdjęcie ! </p>}
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}>X</button>
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
                {progress !=0 && <p className={classes.admin__success}>{`Trwa upload zdjęcia (${Math.round(progress)})%`}</p>}
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}