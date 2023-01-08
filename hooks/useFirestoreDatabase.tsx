import {useState, useEffect} from 'react';
import {firebaseFirestore} from '../Firebase/firebase-config'
import {  doc, setDoc } from "firebase/firestore"; 

export const useFirestoreDatabase = (dataLocation:string, passedProperties: {}, name:string) => {
    const [succesfullUpload, setSuccesfullUpload] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
   useEffect( ()=>{
    const sendData = async () => {
        try{
                await setDoc(doc(firebaseFirestore, dataLocation, name ), passedProperties);
                setSuccesfullUpload(true);
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
   passedProperties && dataLocation && name && sendData();
   },[passedProperties, dataLocation,name])
   return {succesfullUpload, error}
}