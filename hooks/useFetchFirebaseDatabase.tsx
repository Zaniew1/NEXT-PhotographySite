import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import {firebaseFirestore} from '../Firebase/firebase-config'
import { useEffect, useState } from "react";
type FetchedProperties = {}[]
export const useFetchFirebaseDatabase = (collectionToFetch: string) => {
    const [fetchedProperties, setFetchedProperties] = useState<any>()
    useEffect(()=>{
        const fetchAllData = async () => {
            try{
                const querySnapshot = await getDocs(collection(firebaseFirestore, collectionToFetch));
                querySnapshot.forEach((doc) => {
                    setFetchedProperties(prevData => {
                        return{
                            ...prevData,
                               
                                id: doc.id,
                                properties: doc.data()
                            

                        }
                    })
                });
            }catch(err){
                console.log(err)
            }
            }
            fetchAllData();

    },[collectionToFetch ])
    return fetchedProperties
}