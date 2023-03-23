import classes from '../../../Components/AdminPage/main.module.css'
import {firebaseFirestore} from '../../../Firebase/firebase-config';
import {deleteDoc, doc} from 'firebase/firestore';
import {useState, useEffect} from 'react';
import { CustomImage } from '../../../Components/UI/Images/CustomImage';
import  AddPortfolio  from '../../../Components/AdminPage/portfolio/AddPortfolio';
import  AddPicture  from '../../../Components/AdminPage/portfolio/AddPicture';
import  EditPortfolio  from '../../../Components/AdminPage/portfolio/EditPortfolio';
import { useEditFirestoreDatabase } from '../../../hooks/useEditFirestoreDatabase';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import {PortfolioPropertiesToSendType,GalleryElementType } from '../../../Types/types'
type PortfolioElementType = { name:string, description:string,  id:string, date:number, url:string, content: string, orientation:number, pictures:{orientation: number, name: string, date: number, url:string, size: number}[]};
const Portfolio:React.FC<{data:PortfolioElementType[]}> = (props):JSX.Element =>{
    let databaseLocation:string = "Portfolio";
    const router = useRouter();
    const [modalAddToggle,setModalAddToggle] = useState<boolean>(false);
    const [modalAddPictureToggle,setModalAddPictureToggle] = useState<boolean>(false);
    const [modalEditToggle,setModalEditToggle] = useState<boolean>(false);
    const [elementToEdit, setElementToEdit] = useState<PortfolioElementType>({name:'', description:'', orientation: 0, content: '', id:'', date:0,  url:'', pictures:[] })
    const [updateFetchedData,setFetchedData] = useState<number>(0);
    const [isPropertiesReady, setIsPropertiesReady ] = useState<boolean>(false);
    const [propertiesToSend, setPropertiesToSend ] = useState<PortfolioPropertiesToSendType>({});
    const [pictureToDelete, setPictureToDelete] = useState<{element:PortfolioElementType, picture:GalleryElementType}>({element:{name:'', description:'', content:'', orientation: 0, id:'', date:0,  url:'', pictures:[] }, picture:{name:'', size:0, orientation: 0, id:'', date:0, url:''}})
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
    useEffect(()=>{
        const deletePictureHandler = (pictureToDelete:{element:PortfolioElementType, picture:GalleryElementType})=>{
                for (let i = 0; i < pictureToDelete.element.pictures.length; i++) {
                    if (pictureToDelete.element.pictures[i].date === pictureToDelete.picture.date) {
                        pictureToDelete.element.pictures.splice(i, 1);
                      break;
                    }
                  }
                  setPropertiesToSend(pictureToDelete.element)
                  setIdToSend(pictureToDelete.element.id)
                  setIsPropertiesReady(true);
    
        } 
        deletePictureHandler(pictureToDelete)
    },[pictureToDelete])
    useEditFirestoreDatabase(databaseLocation, propertiesToSend, isPropertiesReady ,idtoSend);

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
             { props.data.length > 0 && props.data?.map((element:PortfolioElementType|{}) =>{
                 const {id, date, description, orientation, url, name, content, pictures} = element as PortfolioElementType;
                 const el = element as PortfolioElementType
                return (
                    <div className={classes.overlapper} key={id}>
                    <div className={classes.fetched__wrapper} >
                        <div className={classes.fetched__image__wrapper}>
                            <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                        </div>
                        <div className={classes.fetched__info}>
                            <p className={classes.fetched__paragraph}>{"ID: "+ id}</p>
                            <p className={classes.fetched__paragraph}>{"Nazwa: "+name}</p>
                            <p className={classes.fetched__paragraph}>{"Nagłówek: "+content}</p>
                            <p className={classes.fetched__paragraph}>{"Opis: "+description}</p>
                            <p className={classes.fetched__paragraph}>{"Orientacja zdjęcia: "+`${orientation == 0 ? "Poziome" : "Pionowe"}`}</p>
                            <p className={classes.fetched__paragraph}>{"URL zdjęcia: "+url}</p>
                            <p className={classes.fetched__paragraph}>{`Data dodania: ${new Date(Number(date))}`}</p>
                        </div>
                        <div className={classes.fetched__action} >
                            <button onClick={()=>{deleteElementHandler(id)}} className={classes.fetched__icon}>{'Usuń'}</button>
                            <button onClick={()=>{editElementHandler(el)}} className={classes.fetched__icon}>{'Edytuj'}</button>
                            <button onClick={()=>addNewPictureHandler(el)} className={classes.fetched__icon}>{'Dodaj nowe zdjęcie'}</button>
                        </div>
                    </div>
                    <p style={{textAlign:"center", margin: '40px'}}>{"ZDJĘCIA W PORTFOLIO: "}</p>
                    <div>
                    {pictures.map((picture:GalleryElementType|{}) =>{
                        const {date, url, name, size, orientation} = picture as GalleryElementType;
                        const pic = picture as GalleryElementType
                        return(
                            <div className={classes.fetched__wrapper_pictures} key={date}>
                            <div className={classes.fetched__image__wrapper}>
                                <CustomImage customClass={classes.fetched__image} src={String(url)} alt={String(name)}/>
                            </div>
                            <div className={classes.fetched__info}>
                                <p className={classes.fetched__paragraph}>{"Nazwa: "+name}</p>
                                <p className={classes.fetched__paragraph}>{"Orientacja zdjęcia: "+`${orientation == 0 ? "Poziome" : "Pionowe"}`}</p>
                                <p className={classes.fetched__paragraph}>{"Wielkość zdjęcia: "+`${size !== 0 ? `${size === 1 ? "Duże" : "Bardzo duże"}` : "Małe"}`}</p>
                                <p className={classes.fetched__paragraph}>{"URL zdjęcia: "+url}</p>
                                <p className={classes.fetched__paragraph}>{`Data dodania: ${new Date(Number(date))}`}</p>
                            </div>
                            <div className={classes.fetched__action} >
                                <button onClick={()=>{setPictureToDelete({element: el, picture: pic})}} className={classes.fetched__icon}>{'Usuń'}</button>
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
export async function getStaticProps(){
    const allCollection = collection(firebaseFirestore, "Portfolio");
      const data = await getDocs(allCollection);
      const formattedData = data.docs.map(
        (doc): PortfolioElementType => ({
          ...(doc.data() as PortfolioElementType),
          id: doc.id,
        })
      );
      const sortedStoreData = [...formattedData].sort(
          (a: PortfolioElementType, b: PortfolioElementType) => a.date - b.date
        );
    return {
        props:{
           data: sortedStoreData
        },
        revalidate: 3600
    }
  };


export default Portfolio;