import {useState, useEffect} from 'react';
import {firebaseFirestore} from '../Firebase/firebase-config'
import { collection, query, getDocs, doc} from "firebase/firestore";
export type  PicturesFromFirebase = [{}]
export const useFirestoreDatabase = (pictures: string) => {
    const [docs, setDocs] = useState<PicturesFromFirebase>([{}]);

    useEffect( (): any => {
        const getData = async ()=>{
            const allPictures = query(collection(firebaseFirestore, pictures))
            let documents: PicturesFromFirebase = [{}]
            const snapshot = await getDocs(allPictures);
            snapshot.forEach((doc)=>{
                documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents)
        }
        return () => getData();
        
    }, [pictures])
    return {docs}
}