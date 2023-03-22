import classes from '../main.module.css'
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import  AddOpinion  from '../../../Components/AdminPage/opinion/AddOpinion';
import  EditOpinion  from '../../../Components/AdminPage/opinion/EditOpinion';
import { useRouter } from 'next/router'
import { collection, getDocs } from 'firebase/firestore';
import { OpinionElementType, OpinionPropertiesToSendType } from '../../../Types/types';
const Opinion:React.FC<{data:OpinionElementType[]}> = (props):JSX.Element =>{
    let databaseLocation:string = "Opinion";
    const router = useRouter();
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
    return(
        <div className={classes.admin__opinion}>
            <button  onClick={()=>{router.back()}}className={classes.button__back}>Powróć</button>
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nową opinię"}</button>
            {modalAddToggle && <AddOpinion toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditOpinion toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(props.data)) && props.data.length !== 0 && (Object.keys(props.data[0]).length !== 0 ) && props.data.map((element:OpinionPropertiesToSendType) =>{
                const {name, id, description, url, date} = element as OpinionElementType;
                const el = element as OpinionElementType
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={url} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Imiona: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Opis: "+description}</p>
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
    const allCollection = collection(firebaseFirestore, "Opinion");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): OpinionElementType => ({
          ...(doc.data() as OpinionElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: OpinionElementType, b: OpinionElementType) => a.date - b.date
        );
    return {
        props:{
           data: sortedStoreData
        },
        revalidate: 3600
    }
  };


export default Opinion;