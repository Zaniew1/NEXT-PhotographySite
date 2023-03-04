import classes from './GalleryChanger.module.css';
import { useFirestoreDatabase} from '../../../../hooks/useFirestoreDatabase';
import { useCallback } from 'react';
import { useState, useRef } from 'react';
import { MutableRefObject } from 'react';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFetchFirestore } from '../../../../hooks/useFetchFirestore';
import { GalleryPictures } from '../../../GalleryPictures/GalleryPictures';
import { galleryData } from '../../../../Data/Data';
import {deleteDoc, doc} from 'firebase/firestore'
import {firebaseFirestore} from '../../../../Firebase/firebase-config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomImage } from '../../../UI/Images/CustomImage';
type GalleryFetchedDataType = {id?: string, date?:number, url?: string, size?: number, orientation?: number}
export const GalleryChanger = () => {
    type GalleryPropertiesToSendType = {
        url: string,
        size: number,
        orientation: number,
    }|{}
    const [pictureFiles,setPictureFiles] = useState<string[]>([]);
    const [nameOfData, setNameOfData ] = useState<string>('')
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<GalleryPropertiesToSendType>({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("Gallery")
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let sizeRef = useRef() as MutableRefObject<HTMLSelectElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const file =  e.target?.files[0].name;
            setPictureFiles((prevState) => [...prevState, file])
        }
    }
    
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFiles);

    const addNewGalleryHandler = (e:React.SyntheticEvent) => {
        e.preventDefault();
        setIsPropertiesReady(true)
        const enteredOrientationRef: number = Number(orientationRef.current.value);
        const enteredSizenRef: number = Number(sizeRef.current.value);
        setPropertiesToSend({
            url: pictureURL[0],
            size: enteredSizenRef,
            orientation: enteredOrientationRef,
            date: new Date().getTime()
        })
        fileRef.current.value = '';
        setFetchedData(updateFetchedData+1);
    };
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    const editElementHandler = (element:GalleryFetchedDataType)=>{
        // if(element.name !== undefined && element.description !== undefined){
        //     namesRef.current.value = element.name;
        //     descriptionRef.current.value = element.description;
        // }
        // fileRef.current.value = element.url;
        setFetchedData(updateFetchedData+1);
    }
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    console.log(fetchedProperties)

    return (
        <div className={classes.gallery}>
            {succesfullUpload &&  <p className={classes.gallery__success}>Udało się dodać nową opinię ! </p>}
            {error && <p className={classes.gallery__success}>Niestety wystąpił błąd ! </p>}
            <form className={classes.gallery__wrapper} onSubmit={addNewGalleryHandler}>
                <label className={classes.gallery__label} htmlFor='size'>Rozmiar zdjęcia w galerii</label>
                <select className={classes.gallery__select} ref={sizeRef} name="size" id="size" required>
                    <option value={0} >Małe</option>
                    <option value={1}>Duże</option>
                    <option value={2}>Bardzo Duże</option>
                </select>
                <label className={classes.gallery__label} htmlFor='orientation'>Orientacja Zdjęcia</label>
                <select className={classes.gallery__select} ref={orientationRef} name="orientation" id="orientation" required>
                    <option value={0} >Poziome</option>
                    <option value={1}>Pionowe</option>
                </select>
                <label className={classes.gallery__label} htmlFor='file'>Załącz zdjęcie</label>
                <input className={classes.gallery__input} onChange={fileUploadHandler} ref={fileRef} type="file" id="file" accept='image/png, image/jpeg' required/>
                {succesPictureUpload && <p className={classes.gallery__success}> Zdjęcie gotowe do dodania !</p>}
                <button className={classes.gallery__button} type="submit">Dodaj</button>
            </form>
            <div className={classes.fetched__container}>
                {fetchedProperties.length !== 0 && fetchedProperties.map((el:GalleryFetchedDataType) =>{
                    if(el.url !== undefined){
                        return (
                            <div className={classes.fetched__wrapper} key={el.id}>
                            <CustomImage customClass={classes.fetched__picture} src={el.url} alt={''}/>
                            <div className={classes.fetched__icons} >
                            <div onClick={()=>{deleteElementHandler(el.id)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faTrash} /></div>
                                <div onClick={()=>{editElementHandler(el)}} className={classes.fetched__icon}><FontAwesomeIcon icon={faPenToSquare} /></div>
                            </div>
                        </div>
                    )
                }
                })}
            </div>
            <div className={classes.fetched__data}>
                <GalleryPictures data={galleryData}/>
            </div>
        </div>
        )
}
