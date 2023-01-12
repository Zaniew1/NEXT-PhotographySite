import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import {firebaseFirestore} from '../Firebase/firebase-config'
import { useEffect, useState } from "react";
type FetchedProperties = {}[]
export const useFetchFirebaseDatabase = (collectionToFetch: string) => {
    const [fetchedProperties, setFetchedProperties] = useState<any>()
    useEffect(()=>{
        collectionToFetch &&  ( async () => {
            try{
                const querySnapshot = await getDocs(collection(firebaseFirestore, collectionToFetch));
                querySnapshot.forEach((doc) => {
                    setFetchedProperties((prevState:{}[]) => {
                        if(prevState == undefined){
                            return[
                                {
                                    id: doc.id,
                                    properties: doc.data()
                                
                                   }
                            ]
                        }else{
                        return[
                            ...prevState,
                               {
                                id: doc.id,
                                properties: doc.data()
                            
                               }
                        ]
                    }
                    })
                });
            }catch(err){
                console.log(err)
            }
            })

    },[collectionToFetch ])
    return fetchedProperties
}