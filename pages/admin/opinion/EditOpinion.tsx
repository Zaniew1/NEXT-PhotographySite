
import classes from '../editStyle.module.css'
import {useEffect, useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {OpinionPropertiesToSendType} from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';
import { EditOpinionType } from '../../../Types/types';
export const EditOpinion:React.FC<EditOpinionType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({});
    const [databaseLocation] = useState<string>("Opinion");
    let idToSend = props.elementToEdit.id
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement> 
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0];
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }

    useEffect(()=>{
        descriptionRef.current.value = props.elementToEdit.description;
        namesRef.current.value = props.elementToEdit.name;
    },[props.elementToEdit.description, props.elementToEdit.name ])
    const {pictureURL, succesPictureUpload, progress, setProgress} = useFirestorage(pictureFiles);
    const editHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        setIsPropertiesReady(true);
        props.elementToEdit.name = enteredNamesRef;
        props.elementToEdit.description = enteredDescriptionRef;
        pictureURL.length !== 0  ? props.elementToEdit.url = pictureURL[0]: props.elementToEdit.url;
        setPropertiesToSend(props.elementToEdit)
        descriptionRef.current.value = '';
        namesRef.current.value = '';
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
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady ,idToSend );
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}>X</button>
              <form className={classes.admin__wrapper} onSubmit={editHandler}>
                <label className={classes.admin__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  />
                <label className={classes.admin__label} htmlFor='description'>Opis</label>
                <textarea className={classes.admin__input} ref={descriptionRef}  id="description"  style={{ height:"150px"}}/>
                <label className={classes.admin__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' />
                {progress !=0 && <p className={classes.admin__success}>{`Trwa upload zdjęcia (${Math.round(progress)})%`}</p>}
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Zapisz</button>
            </form>
        </div>
    )
}


