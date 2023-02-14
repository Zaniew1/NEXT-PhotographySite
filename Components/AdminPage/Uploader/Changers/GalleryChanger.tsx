import classes from './GalleryChanger.module.css';
import { useFirestoreDatabase} from '../../../../hooks/useFirestoreDatabase';
import { useContext, useCallback } from 'react';
import { useState, useRef } from 'react';
import { MutableRefObject } from 'react';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import Image from "next/image";

import { InputRef } from '../../../../Types/types';

export const GalleryChanger = (props: {data:{}}) => {
    type GalleryPropertiesToSendType = {
        url: string,
        size: number,
        orientation: number,
    }|{}
    const [pictureFile,setPictureFile] = useState<any>(null);
    const [nameOfData, setNameOfData ] = useState<string>('')
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false)
    const [propertiesToSend, setPropertiesToSend ] = useState<GalleryPropertiesToSendType>({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("Gallery")
    let orientationRef = useRef() as MutableRefObject<HTMLSelectElement>
    let sizeRef = useRef() as MutableRefObject<HTMLSelectElement>
    let fileRef = useRef() as MutableRefObject<HTMLInputElement>
    // Przypisywanie pliku do state
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            setPictureFile(e.target?.files[0].name)
        }
    }
    
    // Uploadowanie zdjęcia
    const {pictureURL, succesPictureUpload} = useFirestorage(pictureFile);

    const addNewGalleryHandler = useCallback((e:React.SyntheticEvent) => {
        e.preventDefault();
        setIsPropertiesReady(true)
        const enteredOrientationRef: number = Number(orientationRef.current.value);
        const enteredSizenRef: number = Number(sizeRef.current.value);
        setPropertiesToSend({
            url: pictureURL,
            size: enteredSizenRef,
            orientation: enteredOrientationRef,
        })
        fileRef.current.value = '';
    }, [pictureURL]);
    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady);
    const {allPictures} = useContext(GalleryContext);
    const fetchedProperties = useFetchFirebaseDatabase("Opinion");
    console.log(fetchedProperties);

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
            {/* {fetchedProperties && fetchedProperties.map((prop:{id:string, properties:{url:string,name:string}}) =>{
                return (
                    <div className={classes.gallery__fetch__wrapper} key={prop.id}>
                        <div></div>
                        <div></div>
                        <Image
                key={prop.id}
                src={prop.properties.url}
                alt={''}
                layout="fill"
                objectFit="cover"
                className={classes.image}
              />
                    </div>
                )
            })} */}
        </div>
    )
}
