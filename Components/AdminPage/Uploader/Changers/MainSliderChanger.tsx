import classes from './MainSliderChanger.module.css';
import { useRef, useState } from 'react';
import { MutableRefObject } from 'react';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import { InputRef } from '../../../../Types/types';
import {deleteDoc, doc} from 'firebase/firestore'
import {firebaseFirestore} from '../../../../Firebase/firebase-config';
import { useFetchFirestore } from '../../../../hooks/useFetchFirestore';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type MainSliderPropertiesToSendType = {
    name:string,
    url: string,
    date:number,
} | {}
export const MainSliderChanger = () => {
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const [pictureFile,setPictureFile] = useState<any>(null);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<MainSliderPropertiesToSendType>({})
    const [databaseLocation] = useState<string>("MainSlider");
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFile);
    const addNewMainSliderHandler = async (e:React.SyntheticEvent) => {
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
        setFetchedData(updateFetchedData+1);
    }
    const deleteElementHandler = async (id:string | undefined ) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    const editElementHandler = (element:MainSliderElementType)=>{
        if(element.name !== undefined){
            namesRef.current.value = element.name;
        }
    }
    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation, propertiesToSend, isPropertiesReady)
    type MainSliderElementType = {id?: string, url?: string, name?: string, date?:number}
    console.log(fetchedProperties)
    return (
        <div className={classes.main}>
            {succesfullUpload &&  <p className={classes.main__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.main__success}>Niestety wystąpił błąd ! </p>}
            <form className={classes.main__wrapper} onSubmit={addNewMainSliderHandler}>
                <label className={classes.main__label} htmlFor='names'>Nazwa Zdjęcia</label>
                <input className={classes.main__input} ref={namesRef} type="text" id="names"  required/>
                <label className={classes.main__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.main__input} onChange={fileUploadHandler} ref={fileRef} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.main__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.main__button} type="submit">Dodaj</button>
            </form>
            <div>

           {fetchedProperties.length !== 0  && fetchedProperties.map((el:MainSliderElementType) => {
                return (
                    <div className={classes.fetched__wrapper} key={el.id}>
                        <p className={classes.fetched__paragraph}>{el.name}</p>
                        <div className={classes.fetched__icons} >
                            <div onClick={()=>{deleteElementHandler(el.id)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                            <div onClick={()=>{editElementHandler(el)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                    </div>
            )
        })}
        </div>
        </div>
    )
}