
import classes from './AddOpinion.module.css'
import {useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {OpinionPropertiesToSendType} from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';
type OpinionElementType = {name:string, description: string, id:string, date:number, url:string};
type AddOpinionType = {toggle:()=>void, update:(updateCounter:number)=>void, updateCounter:number, elementToEdit:OpinionElementType }
export const EditOpinion:React.FC<AddOpinionType> = (props): JSX.Element=>{
    console.log('wszedłem do edycji')
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<OpinionPropertiesToSendType>({});
    const [databaseLocation] = useState<string>("Opinion");
    let idToSend = props.elementToEdit.id
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0].name
            setPictureFiles((prevState)=>[...prevState, file])
        }
    }
    
    // Uploadowanie zdjęcia
        // descriptionRef.current.value = props.elementToEdit.description;
        // namesRef.current.value = props.elementToEdit.description;

    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);
    const editOpinionHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        setIsPropertiesReady(true);
        setPropertiesToSend({
            name: enteredNamesRef,
            description: enteredDescriptionRef,
            url: pictureURL[0],
        })
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady ,idToSend );
    console.log(succesfullUpload)
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
            {error && <p className={classes.opinion__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}></button>
              <form className={classes.opinion__wrapper} onSubmit={editOpinionHandler}>
                <label className={classes.opinion__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.opinion__input} ref={namesRef} type="text" id="names"  />
                <label className={classes.opinion__label} htmlFor='description'>Opis</label>
                <input className={classes.opinion__input} ref={descriptionRef} type="text" id="description" />
                <label className={classes.opinion__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.opinion__input} onChange={fileUploadHandler} ref={fileRef} type="file" id="file" accept='image/png, image/jpeg' />
                {succesPictureUpload && <p className={classes.opinion__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.opinion__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}


