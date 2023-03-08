import classes from '../main.module.css'
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import { AddPortfolio } from './AddPortfolio';
import { EditPortfolio } from './EditPortfolio';
import { useRouter } from 'next/router'

type PortfolioElementType = { name:string, description:string,  id:string, date:number, url:string, orientation:number, pictures:{}[]};
const Portfolio:React.FC = ():JSX.Element =>{
    let databaseLocation:string = "Portfolio";
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<PortfolioElementType>({name:'', description:'', orientation: 0, id:'', date:0,  url:'', pictures:[] })
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }

    const editElementHandler = async (element: PortfolioElementType ) =>{
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
            {modalAddToggle && <AddPortfolio toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditPortfolio toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(fetchedProperties)) && fetchedProperties.length !== 0 && (Object.keys(fetchedProperties[0]).length !== 0 ) && fetchedProperties.map((element:any) =>{
                const {id, date, description, orientation, url, name, pictures} = element as PortfolioElementType;
                return (
                    <>
                    <div className={classes.fetched__wrapper} key={id}>
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
                        </div>
                    </div>
                    <div>
                        {/* {pictures.forEach(picture=>{
                            return(
                                <div>

                                </div>
                            )
                        })} */}
                    </div>
                    </>
                 ) 
             })}
        </div>
    )
} 
export default Portfolio;