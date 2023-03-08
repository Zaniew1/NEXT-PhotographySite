import classes from '../main.module.css'
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import { AddGallery } from './AddGallery';
import { EditGallery } from './EditGallery';
import { useRouter } from 'next/router'

type GalleryElementType = {name:string, id:string, date:number, url:string, size:number, orientation:number};
const Gallery:React.FC = ():JSX.Element =>{
    let databaseLocation:string = "Gallery";
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<GalleryElementType>({name:'',  id: '', url: '' ,date:0,  size:0, orientation:0})
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }

    const editElementHandler = async (element: GalleryElementType ) =>{
        setElementToEdit(element);
        toggleEditModal();
    }
    const toggleAddModal = ()=>{
        setModalAddToggle(!modalAddToggle)
    }
    const toggleEditModal = ()=>{
        setModalEditToggle(!modalEditToggle)
    }
    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    return(
        <div className={classes.admin__opinion}>
            <button  onClick={()=>{router.back()}}className={classes.button__back}>Powróć</button>
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nowe zdjęcie"}</button>
            {modalAddToggle && <AddGallery toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditGallery toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(fetchedProperties)) && fetchedProperties.length !== 0 && (Object.keys(fetchedProperties[0]).length !== 0 ) && fetchedProperties.map((element:any) =>{
                const {name, id, url, date, size, orientation} = element as GalleryElementType;
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Tytuł: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Orientacja: "+orientation}</p>
                            <p className={classes.fetched__paragraph}>{"Rozmiar: "+size}</p>
                            <p className={classes.fetched__paragraph}>{"URL zdjęcia: "+url}</p>
                            <p className={classes.fetched__paragraph}>{`Data dodania: ${new Date(Number(date))}`}</p>
                        </div>
                        <div className={classes.fetched__action} >
                            <button onClick={()=>{deleteElementHandler(id)}} className={classes.fetched__icon}>{'Usuń'}</button>
                            <button onClick={()=>{editElementHandler(element)}} className={classes.fetched__icon}>{'Edytuj'}</button>
                        </div>
                    </div>
                 ) 
             })}
        </div>
    )
} 
export default Gallery;