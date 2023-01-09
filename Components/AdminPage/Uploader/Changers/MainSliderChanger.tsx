import classes from './MainSliderChanger.module.css';
import { useRef, useState } from 'react';
import { MutableRefObject } from 'react';
import { useFirestorage } from '../../../../hooks/useFirestorage';
import { useFirestoreDatabase } from '../../../../hooks/useFirestoreDatabase';
import { InputRef } from '../../../../Types/types';
type MainSliderPropertiesToSendType = {
    name:string,
    url: string,
} | {}
export const MainSliderChanger = () => {

    const [pictureFile,setPictureFile] = useState<any>(null);
    const [nameOfData, setNameOfData ] = useState<string>('')
    const [propertiesToSend, setPropertiesToSend ] = useState<MainSliderPropertiesToSendType>({})
    const [databaseLocation, setDatabaseLocation ] = useState<string>("MainSlider")
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
        setNameOfData(enteredNamesRef);
        setPropertiesToSend({
            name: enteredNamesRef,
            url: pictureURL
        })
        namesRef.current.value = '';
        fileRef.current.value = '';
    }



    const {succesfullUpload, error} = useFirestoreDatabase(databaseLocation,propertiesToSend, nameOfData)

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
        </div>
    )
}