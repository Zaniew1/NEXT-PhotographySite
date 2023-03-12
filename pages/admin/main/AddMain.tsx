import classes from '../addStyle.module.css'
import {useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {MainPropertiesToSendType} from '../../../Types/types';
import { useFirestoreDatabase } from '../../../hooks/useFirestoreDatabase';
import { AddAdminType } from '../../../Types/types';
export const AddMain:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<MainPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("MainSlider")
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
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
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            url: pictureURL[0],
            date: new Date().getTime()
        })
        namesRef.current.value = '';
        fileRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    console.log(succesfullUpload)
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
              {succesfullUpload &&  <p className={classes.admin__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}></button>
              <form className={classes.admin__wrapper} onSubmit={addNewHandler}>
                <label className={classes.admin__label} htmlFor='names'>Tytuł zdjęcia</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.admin__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}