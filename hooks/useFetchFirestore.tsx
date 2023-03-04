import {useState, useEffect} from 'react';
import {firebaseFirestore} from './../Firebase/firebase-config';
import {collection, getDocs} from 'firebase/firestore';
export const useFetchFirestore = (place:string,updateFetchedData?:number) => {

    const [fireStoreData, setFireStoreData] = useState<{}[]>([]);
    useEffect(()=>{
        const allCollection = collection(firebaseFirestore, place);
        const getData = async ()=>{
            const data = await getDocs(allCollection);
            setFireStoreData(data.docs.map(doc=>({...doc.data(), id:doc.id})));
        }
        getData();
    },[place,updateFetchedData])
    ///////////////////DO ZMIANY ANYYY !!!!!!!!!!!!!! ///////////////////
    let sortedStoreData = fireStoreData.sort((a:any, b:any) => a.date - b.date)
    return sortedStoreData;
}