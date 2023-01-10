import { collection, getDocs } from "firebase/firestore";
import {firebaseFirestore} from '../Firebase/firebase-config'

import { useEffect } from "react";
export const useFetchFirebaseDatabase = (collectionToFetch: string) => {
    useEffect(()=>{
        const arrayOfDocs = [];
        const fetchAllData = async () => {
            const querySnapshot = await getDocs(collection(firebaseFirestore, collectionToFetch));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }
        

    },[collectionToFetch])
}