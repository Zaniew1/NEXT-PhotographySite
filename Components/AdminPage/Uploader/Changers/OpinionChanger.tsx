import classes from './OpinionChanger.module.css'; 
import {  doc, setDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseFirestore, firebaseStorage } from '../../../../Firebase/firebase-config';
import {useRef, useState, useEffect, ChangeEvent, InputHTMLAttributes} from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../../Types/types';
import { fileURLToPath } from 'url';
export const OpinionChanger = () => {
    // DO ZMIANY ANY ////
    const [pictureFile,setPictureFile] = useState<any>("");
    const [pictureURL, setPictureURL] = useState<string>('')
    let descriptionRef = useRef() as MutableRefObject<HTMLInputElement>
    const namesRef = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    useEffect(()=>{
        const uploadFile = () => {
            const name = new Date().getTime() + String(pictureFile);
            const storage  =  ref(firebaseStorage, name );
            const uploadTask = uploadBytesResumable(storage, pictureFile);
            uploadTask.on('state_changed', (snapshot)=> {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is '+ progress + '% done');
                switch(snapshot.state){
                    case 'paused':
                        console.log('Upload is paused');
                    break;
                    case 'running':
                        console.log('Upload is running');
                    break;
                    default:
                    break;
                }
            }, (error)=>{
                console.log(error);
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setPictureURL(downloadURL);
                    console.log(downloadURL)
                });
            });
        }
        pictureFile&& uploadFile();
    },[pictureFile])
    const addNewOpinionHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value
        const enteredNamesRef: InputRef = namesRef.current.value;
        console.log(enteredDescriptionRef, enteredNamesRef )
        try{


            await setDoc(doc(firebaseFirestore, "Opinions", enteredNamesRef ), {
                picture: pictureURL,
                description: enteredDescriptionRef,
                names: enteredNamesRef
            });
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className={classes.opinion}>
            <form className={classes.opinion__wrapper} onSubmit={addNewOpinionHandler}>
                <label className={classes.opinion__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.opinion__input} onChange={fileUploadHandler} type="file" id="file" accept='image/png, image/jpeg'/>
                <label className={classes.opinion__label} htmlFor='description'>Opis</label>
                <input className={classes.opinion__input} ref={descriptionRef} type="text" id="description"/>
                <label className={classes.opinion__label} htmlFor='names'>Imiona pary</label>
                <input className={classes.opinion__input} ref={namesRef} type="text" id="names" />
                <button className={classes.opinion__button} type="submit">Dodaj</button>
            </form>
        </div>
    )
}