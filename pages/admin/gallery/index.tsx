import classes from '../../../Components/AdminPage/main.module.css'
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import AddGallery  from '../../../Components/AdminPage/gallery/AddGallery';
import  EditGallery  from '../../../Components/AdminPage/gallery/EditGallery';
import { useRouter } from 'next/router'
import { GalleryElementType, GalleryPropertiesToSendType } from '../../../Types/types';
import { collection, getDocs } from 'firebase/firestore';

const Gallery:React.FC<{data:GalleryElementType[]}> = (props):JSX.Element =>{
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
    return(
        <div className={classes.admin__opinion}>
            <button  onClick={()=>{router.back()}}className={classes.button__back}>Powróć</button>
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nowe zdjęcie"}</button>
            {modalAddToggle && <AddGallery toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditGallery toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(props.data)) && props.data.length !== 0 && (Object.keys(props.data[0]).length !== 0 ) && props.data.map((element:GalleryPropertiesToSendType) =>{
                const {name, id, url, date, size, orientation} = element as GalleryElementType;
                const el =  element as GalleryElementType
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
                            <button onClick={()=>{editElementHandler(el)}} className={classes.fetched__icon}>{'Edytuj'}</button>
                        </div>
                    </div>
                 ) 
             })}
        </div>
    )
} 
export async function getStaticProps(){
    const allCollection = collection(firebaseFirestore, "Gallery");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): GalleryElementType => ({
          ...(doc.data() as GalleryElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: GalleryElementType, b: GalleryElementType) => a.date - b.date
        );
    return {
        props:{
           data: sortedStoreData
        },
        revalidate: 3600
    }
  };

export default Gallery;