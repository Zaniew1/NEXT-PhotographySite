import {useState, useEffect} from 'react';
import {firebaseFirestore} from '../Firebase/firebase-config'
import {  collection, addDoc } from "firebase/firestore"; 

export const useFirestoreDatabase = (dataLocation:string, passedProperties: {}, isPropertiesReady:boolean) => {
    const [succesfullUpload, setSuccesfullUpload] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
   useEffect( ()=>{
    const sendData = async () => {
        try{

                await addDoc(collection(firebaseFirestore, dataLocation), passedProperties);
                console.log('dodaję nowy obiekt')
                setSuccesfullUpload(true);
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
   passedProperties && dataLocation && isPropertiesReady && sendData();
   },[passedProperties, dataLocation,isPropertiesReady])
   return {succesfullUpload, error}
}