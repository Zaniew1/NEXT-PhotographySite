import classes from '../main.module.css'
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import { AddPortfolio } from './AddPortfolio';
import { AddPicture } from './AddPicture';
import { EditPortfolio } from './EditPortfolio';
import { useEditFirestoreDatabase } from '../../../hooks/useEditFirestoreDatabase';
import { useRouter } from 'next/router';
import {PricePropertiesToSendType} from '../../../Types/types'
type GalleryElementType = {name:string, size:number, orientation: number, id:string, date:number, url:string};
type PortfolioElementType = { name:string, description:string,  id:string, date:number, url:string, orientation:number, pictures:{orientation: number, name: string, date: number, url:string, size: number}[]};
const Portfolio:React.FC = ():JSX.Element =>{
    let databaseLocation:string = "Portfolio";
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalAddPictureToggle,setModalAddPictureToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<PortfolioElementType>({name:'', description:'', orientation: 0, id:'', date:0,  url:'', pictures:[] })
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<PricePropertiesToSendType>({});
    const [idtoSend, setIdToSend ] = useState<string>('');
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }

    const editElementHandler = (element: PortfolioElementType ) =>{
        setElementToEdit(element);
        toggleEditModal();
    }
    const addNewPictureHandler = (element: PortfolioElementType)=>{
        setElementToEdit(element);
        toggleAddPictureModal();
    }
    const toggleAddModal = ()=>{
        setModalAddToggle(!modalAddToggle)
    }
    const toggleAddPictureModal = ()=>{
        setModalAddPictureToggle(!modalAddPictureToggle)
    }
    const toggleEditModal = ()=>{
        setModalEditToggle(!modalEditToggle)
    }
    const deletePictureHandler = (element:PortfolioElementType , picture:GalleryElementType)=>{
        for (let i = 0; i < element.pictures.length; i++) {
            if (element.pictures[i].url === picture.url) {
                element.pictures.splice(i, 1);
              break;
            }
          }
          setPropertiesToSend(element)
          setIdToSend(element.id)
          setIsPropertiesReady(true);
    }
    useEditFirestoreDatabase(databaseLocation, propertiesToSend, isPropertiesReady ,idtoSend);


    const fetchedProperties = useFetchFirestore(databaseLocation, updateFetchedData);
    return(
        <div className={classes.admin__opinion}>
            <button  onClick={()=>{router.back()}}className={classes.button__back}>Powróć</button>
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nowe portfolio"}</button>
            {modalAddToggle && <AddPortfolio toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData} />}
            {modalAddPictureToggle && <AddPicture toggle={toggleAddPictureModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit} />}
            {modalEditToggle && <EditPortfolio toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddPictureToggle  && <div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(fetchedProperties)) && fetchedProperties.length !== 0 && (Object.keys(fetchedProperties[0]).length !== 0 ) && fetchedProperties.map((element:any) =>{
                const {id, date, description, orientation, url, name, pictures} = element as PortfolioElementType;
                return (
                    <div className={classes.overlapper} key={id}>
                    <div className={classes.fetched__wrapper} >
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Nazwa: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Opis: "+description}</p>
                            <p className={classes.fetched__paragraph}>{"Orientacja zdjęcia: "+`${orientation == 0 ? "Poziome" : "Pionowe"}`}</p>
                            <p className={classes.fetched__paragraph}>{"URL zdjęcia: "+url}</p>
                            <p className={classes.fetched__paragraph}>{`Data dodania: ${new Date(Number(date))}`}</p>
                        </div>
                        <div className={classes.fetched__action} >
                            <button onClick={()=>{deleteElementHandler(id)}} className={classes.fetched__icon}>{'Usuń'}</button>
                            <button onClick={()=>{editElementHandler(element)}} className={classes.fetched__icon}>{'Edytuj'}</button>
                            <button onClick={()=>addNewPictureHandler(element)} className={classes.fetched__icon}>{'Dodaj nowe zdjęcie'}</button>
                        </div>
                    </div>
                    <p style={{textAlign:"center", margin: '40px'}}>{"ZDJĘCIA W PORTFOLIO: "}</p>
                    <div>
                    {pictures.map((picture:any) =>{
                        return(
                            <div className={classes.fetched__wrapper_pictures} key={picture.date}>
                            <div className={classes.fetched__image__wrapper}>
                                <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                            </div>
                            <div className={classes.fetched__info}>
                                <p className={classes.fetched__paragraph}>{"Nazwa: "+picture.name}</p>
                                <p className={classes.fetched__paragraph}>{"Orientacja zdjęcia: "+`${picture.orientation == 0 ? "Poziome" : "Pionowe"}`}</p>
                                <p className={classes.fetched__paragraph}>{"Wielkość zdjęcia: "+`${picture.size !== 0 ? `${picture.size === 1 ? "Duże" : "Bardzo duże"}` : "Małe"}`}</p>
                                <p className={classes.fetched__paragraph}>{"URL zdjęcia: "+picture.url}</p>
                                <p className={classes.fetched__paragraph}>{`Data dodania: ${new Date(Number(picture.date))}`}</p>
                            </div>
                            <div className={classes.fetched__action} >
                                <button onClick={()=>{deletePictureHandler(element, picture)}} className={classes.fetched__icon}>{'Usuń'}</button>
                            </div>
                        </div>
                            )
                    })}
                    </div>
                    </div>
                 ) 
             })}
        </div>
    )
} 
export default Portfolio;