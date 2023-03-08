
import classes from '../editStyle.module.css'
import {useEffect, useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {MainPropertiesToSendType} from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';
type MainElementType = {name:string, id:string, date:number, url:string};
type AddAdminType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:MainElementType }
export const EditMain:React.FC<AddAdminType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<MainPropertiesToSendType>({});
    const [databaseLocation] = useState<string>("MainSlider");
    let idToSend = props.elementToEdit.id
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0].name
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    
    // Uploadowanie zdjęcia
    useEffect(()=>{
        namesRef.current.value = props.elementToEdit.name;
    },[ props.elementToEdit.name ])

    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const editHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        setIsPropertiesReady(true);
        props.elementToEdit.name = enteredNamesRef;
        pictureURL.length !== 0  ? props.elementToEdit.url = pictureURL[0]: props.elementToEdit.url;
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
                <label className={classes.admin__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={fileRef} style={{border:'none'}} type="file" id="file" accept='image/png, image/jpeg' />
                {succesPictureUpload && <p className={classes.admin__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Zapisz</button>
            </form>
        </div>
    )
}


