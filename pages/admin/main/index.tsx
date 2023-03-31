import classes from '../../../Components/AdminPage/main.module.css'
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import  AddMain  from '../../../Components/AdminPage/main/AddMain';
import  EditMain  from '../../../Components/AdminPage/main/EditMain';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { useContext, useEffect} from 'react';
import {AuthContext} from '../../../Store/Auth-context';
import { MainElementType, MainPropertiesToSendType } from '../../../Types/types';
const Main:React.FC<{data:MainElementType[]}> = (props):JSX.Element =>{
    const {loggedIn} = useContext(AuthContext);
    let databaseLocation:string = "MainSlider";
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<MainElementType>({name:'',  id: '', url: '' ,date:0})
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const deleteElementHandler = async (id:string | undefined) =>{
        if(id !== undefined){
            await deleteDoc(doc(firebaseFirestore, databaseLocation, id))
            setFetchedData(updateFetchedData+1);
        }
    }
    useEffect(()=>{
        if(!loggedIn){
            router.push('/login');
        }
    },[loggedIn, router])
    const editElementHandler = async (element: MainElementType ) =>{
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
            <button onClick={toggleAddModal} className={classes.admin__opinion__add}>{"Dodaj nowy slajd"}</button>
            {modalAddToggle && <AddMain toggle={toggleAddModal} updateCounter={updateFetchedData} update={setFetchedData}/>}
            {modalEditToggle && <EditMain toggle={toggleEditModal} updateCounter={updateFetchedData} update={setFetchedData} elementToEdit={elementToEdit}/>}
            {modalAddToggle  &&<div className={classes.admin__opinion__modal__backdrop}></div>}
            {modalEditToggle &&<div className={classes.admin__opinion__modal__backdrop}></div>}
             {(Array.isArray(props.data)) && props.data.length !== 0 && (Object.keys(props.data[0]).length !== 0 ) && props.data.map((element:MainPropertiesToSendType) =>{
                const {name, id, url, date} = element as MainElementType;
                const el = element as MainElementType;
                return (
                    <div className={classes.fetched__wrapper} key={id}>
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Tytuł: "+name}</p>
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
    const allCollection = collection(firebaseFirestore, "MainSlider");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): MainElementType => ({
          ...(doc.data() as MainElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: MainElementType, b: MainElementType) => a.date - b.date
        );
    return {
        props:{
           data: sortedStoreData
        },
        revalidate: 60
    }
  };

export default Main;