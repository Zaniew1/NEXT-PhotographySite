
import classes from '../editStyle.module.css'
import {useEffect, useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {PricePropertiesToSendType} from '../../../Types/types';
import { EditPortflioType } from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';

export const EditPortfolio:React.FC<EditPortflioType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<PricePropertiesToSendType>({});
    const [databaseLocation] = useState<string>("Portfolio");
    let idToSend = props.elementToEdit.id;
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>
    let contentRef = useRef() as MutableRefObject<HTMLInputElement>
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>

    let file1Ref = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0];
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }

    useEffect(()=>{
        namesRef.current.value = props.elementToEdit.name;
        descriptionRef.current.value = props.elementToEdit.description;
        contentRef.current.value = props.elementToEdit.content;

    },[props.elementToEdit.description, props.elementToEdit.name,props.elementToEdit.content ])

    const {pictureURL, succesPictureUpload, progress, setProgress} = useFirestorage(pictureFiles);
    const editHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredOrientationRef: InputRef = orientationRef.current.value.trim()
        const enteredContentRef: InputRef = contentRef.current.value.trim();

        setIsPropertiesReady(true);
        props.elementToEdit.name = enteredNamesRef;
        props.elementToEdit.description = enteredDescriptionRef;
        props.elementToEdit.content = enteredContentRef;
        props.elementToEdit.orientation = Number(enteredOrientationRef);
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
                <label className={classes.admin__label} htmlFor='names'>Nazwa Portfolio</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  />
                <label className={classes.admin__label} htmlFor='description'>Opis</label>
                <textarea className={classes.admin__input} ref={descriptionRef}  id="description"  style={{ height:"150px"}}/>
                <label className={classes.admin__label} htmlFor='content'>Nagłówek portfolio</label>
                <input className={classes.admin__input} ref={contentRef} type="text" id="content"  required/>
                <label className={classes.admin__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.admin__select} ref={orientationRef} defaultValue={props.elementToEdit.orientation} name="orientation" id="orientation" >
                    <option value={0} >Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.admin__label} htmlFor='file1'>Załącz zdjęcie nr 1</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={file1Ref} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' />
                {progress !=0 && <p className={classes.admin__success}>{`Trwa upload zdjęcia (${Math.round(progress)})%`}</p>}
                {succesPictureUpload && <p className={classes.admin__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Zapisz</button>
            </form>
        </div>
    )
}


