import classes from './index.module.css'
import { useFetchFirestore } from '../../../hooks/useFetchFirestore';
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import { AddOpinion } from './AddOpinion';
import { EditOpinion } from './EditOpinion';
type OpinionElementType = {name:string, description: string, id:string, date:number, url:string};
const Opinion:React.FC = ():JSX.Element =>{
    let databaseLocation:string = "Opinion";
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<OpinionElementType>({name:'', description:'', id: '', url: '' ,date:0})
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    const editElementHandler = async (element: OpinionElementType ) =>{
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
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nową opinię"}</button>
            {modalAddToggle && <AddOpinion toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditOpinion toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(fetchedProperties)) && fetchedProperties.length !== 0 && (Object.keys(fetchedProperties[0]).length !== 0 ) && fetchedProperties.map((element:any) =>{
                const {name, id, description, url, date} = element as OpinionElementType;
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Imiona: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Opis: "+description}</p>
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
export default Opinion;