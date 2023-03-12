import {useState, useEffect} from 'react';
import {firebaseFirestore} from '../Firebase/firebase-config'
import { doc, updateDoc } from "firebase/firestore";
export const useEditFirestoreDatabase = (dataLocation:string, passedProperties: {}, isPropertiesReady:boolean, id: string) => {
    const [succesfullUpload, setSuccesfullUpload] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
   useEffect( ()=>{
    const sendData = async () => {
        try{
            console.log(firebaseFirestore);
            console.log(dataLocation);
            console.log(id);
            console.log(passedProperties);
                await updateDoc(doc(firebaseFirestore, dataLocation, id), passedProperties);
                setSuccesfullUpload(true);
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
   passedProperties && dataLocation && isPropertiesReady && sendData();
   },[passedProperties, dataLocation,isPropertiesReady, id])
   return {succesfullUpload, error}
}