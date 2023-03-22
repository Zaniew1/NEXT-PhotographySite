
import classes from '../editStyle.module.css'
import {useEffect, useRef, useState, } from 'react';
import { MutableRefObject } from "react";
import { InputRef } from '../../../Types/types';
import { useFirestorage } from '../../../hooks/useFirestorage';
import {PricePropertiesToSendType} from '../../../Types/types';
import { EditPriceType } from '../../../Types/types';
import { useEditFirestoreDatabase} from '../../../hooks/useEditFirestoreDatabase';
const EditPrice:React.FC<EditPriceType> = (props): JSX.Element=>{
    const [pictureFiles,setPictureFiles] = useState<File[]>([]);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<PricePropertiesToSendType>({});
    const [databaseLocation] = useState<string>("Price");
    let idToSend = props.elementToEdit?.id;
    let namesRef = useRef() as MutableRefObject<HTMLInputElement>
    let priceRef = useRef() as MutableRefObject<HTMLInputElement>
    let descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>
    let contentRef = useRef() as MutableRefObject<HTMLTextAreaElement>
    let file1Ref = useRef() as MutableRefObject<HTMLInputElement>
    let file2Ref = useRef() as MutableRefObject<HTMLInputElement>
    const fileUploadHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            let file = e.target?.files[0];
            setPictureFiles((prevState)=>[...prevState, file]);
        }
    }
    const fileUploadHandler2 = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null){
            const file =  e.target?.files[0];
            setPictureFiles((prevState) => [...prevState, file]);
        }
    }
    useEffect(()=>{
        namesRef.current.value = props.elementToEdit?.name;
        priceRef.current.value = props.elementToEdit?.price;
        contentRef.current.value = props.elementToEdit?.content;
        descriptionRef.current.value = props.elementToEdit?.description;
    },[props.elementToEdit?.description, props.elementToEdit?.name, props.elementToEdit?.price,props.elementToEdit?.content ])

    const {pictureURL, succesPictureUpload, progress, setSuccesPictureUpload, setProgress} = useFirestorage(pictureFiles);
    const editHandler = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        const enteredDescriptionRef: InputRef = descriptionRef.current.value.trim()
        const enteredNamesRef: InputRef = namesRef.current.value.trim();
        const enteredPriceRef:InputRef = priceRef.current.value;
        const enteredContentRef: InputRef = contentRef.current.value.trim();
        setIsPropertiesReady(true);
        props.elementToEdit.name = enteredNamesRef;
        props.elementToEdit.description = enteredDescriptionRef;
        props.elementToEdit.content = enteredContentRef;
        props.elementToEdit.price = enteredPriceRef;
        pictureURL.length !== 0  ? props.elementToEdit.url1 = pictureURL[0]: props.elementToEdit?.url1;
        pictureURL.length === 2  ? props.elementToEdit.url2 = pictureURL[1]: props.elementToEdit?.url2;
        setPropertiesToSend(props.elementToEdit)
        descriptionRef.current.value = '';
        namesRef.current.value = '';
        props.update(props.updateCounter + 1);
    }
    useEffect(()=>{
        if(progress == 100 && succesPictureUpload == true){
            const turnOffSuccess = setTimeout(()=>{
                setSuccesPictureUpload(false)
                setProgress(0)
            },2000)
            return ()=> clearInterval(turnOffSuccess)
        }
    }, [succesPictureUpload,progress, setProgress, setSuccesPictureUpload ])
    const {succesfullUpload, error} = useEditFirestoreDatabase(databaseLocation,propertiesToSend, isPropertiesReady ,idToSend );
    console.log(succesfullUpload)
    {succesfullUpload && props.toggle()}
    return(
        <div className={classes.modal__add}>
            {error && <p className={classes.admin__success}>Niestety wystąpił błąd ! </p>}
            <button onClick={props.toggle} className={classes.modal__closure}>X</button>
            <form className={classes.admin__wrapper} onSubmit={editHandler}>
                <label className={classes.admin__label} htmlFor='names'>Nazwa Pakietu</label>
                <input className={classes.admin__input} ref={namesRef} type="text" id="names"  />
                <label className={classes.admin__label} htmlFor='description'>Opis</label>
                <textarea className={classes.admin__input} ref={descriptionRef}  id="description"  style={{ height:"150px"}}/>
                <label className={classes.admin__label} htmlFor='price'>Cena</label>
                <input className={classes.admin__input} ref={priceRef} type="text" id="price" />
                <label className={classes.admin__label} htmlFor='content'>Z czego się składa pakiet:</label>
                <textarea className={classes.admin__input} ref={contentRef} style={{ height:"150px"}} id="content" required/>
                <label className={classes.admin__label} htmlFor='file1'>Załącz zdjęcie nr 1</label>
                <input className={classes.admin__input} onChange={fileUploadHandler} ref={file1Ref} style={{border:'none'}} type="file" id="file1" accept='image/png, image/jpeg' />
                <label className={classes.admin__label} htmlFor='file2'>Załącz zdjęcie nr 2</label>
                <input className={classes.admin__input} onChange={fileUploadHandler2} ref={file2Ref} style={{border:'none'}} type="file" id="file2" accept='image/png, image/jpeg' />
                {progress !=0 && <p className={classes.admin__success}>{`Trwa upload zdjęcia (${Math.round(progress)})%`}</p>}
                {succesPictureUpload && <p className={classes.admin__success}> Wszystko gotowe do dodania !</p>}
                <button className={classes.admin__button} type="submit">Zapisz</button>
            </form>
        </div>
    )
}


export default EditPrice;