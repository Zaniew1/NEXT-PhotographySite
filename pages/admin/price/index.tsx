import classes from '../main.module.css'
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import  AddPrice  from '../../../Components/AdminPage/price/AddPrice';
import  EditPrice  from '../../../Components/AdminPage/price/EditPrice';
import { useRouter } from 'next/router'
import { PricePropertiesToSendType,PriceElementType } from '../../../Types/types';
import { collection, getDocs } from 'firebase/firestore';

const Price:React.FC<{data:PriceElementType[]}> = (props):JSX.Element =>{
    let databaseLocation:string = "Price";
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<PriceElementType>({content:'',name:'', description:'', price: '', id:'', date:0,  url1:'', url2:''})
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }

    const editElementHandler = async (element: PriceElementType ) =>{
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
            {modalAddToggle && <AddPrice toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditPrice toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(props.data)) && props.data.length !== 0 && (Object.keys(props.data[0]).length !== 0 ) && props.data.map((element:PricePropertiesToSendType) =>{
                const {id, date, description, url1, url2, content, price, name} = element as PriceElementType;
                const el = element as PriceElementType
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url1)} alt={String(content)}/>
                        </div>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url2)} alt={String(content)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Pakiet: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Opis: "+description}</p>
                            <p className={classes.fetched__paragraph}>{"Cena: "+price}</p>
                            <p className={classes.fetched__paragraph}>{"Co zawiera pakiet: "+content}</p>
                            <p className={classes.fetched__paragraph}>{"URL zdjęcia1: "+url1}</p>
                            <p className={classes.fetched__paragraph}>{"URL zdjęcia2: "+url2}</p>
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
    const allCollection = collection(firebaseFirestore, "Price");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): PriceElementType => ({
          ...(doc.data() as PriceElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: PriceElementType, b: PriceElementType) => a.date - b.date
        );
    return {
        props:{
           data: sortedStoreData
        },
        revalidate: 3600
    }
  };
export default Price;