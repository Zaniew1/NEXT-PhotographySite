import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../Firebase/firebase-config';
import {useState, useEffect,} from 'react';
    ///////////////////DO ZMIANY ANYYY !!!!!!!!!!!!!! ///////////////////
export const useFirestorage = (pictureFiles:any) => {
    const [pictureURL, setPictureURL] = useState<string[]>([]);
    const [succesPictureUpload, setSuccesPictureUpload] = useState<boolean>(false);
    useEffect(()=>{
        setPictureURL([]); 
    ///////////////////DO ZMIANY ANYYY !!!!!!!!!!!!!! ///////////////////
        const uploadFile = (element:any) => {
            const name = new Date().getTime() + String(element);
        const storage  =  ref(firebaseStorage, name );
        const uploadTask = uploadBytesResumable(storage, element);
        uploadTask.on('state_changed', (snapshot)=> {
            
            switch(snapshot.state){
                case 'paused':
                    console.log('Upload is paused');
                break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
                }
            }, (error)=>{
                console.log(error);
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setPictureURL((prevState)=>[...prevState, downloadURL]);
                    console.log('Upload is Done')
                    setSuccesPictureUpload(true)
                });
            });
        }
    ///////////////////DO ZMIANY ANYYY !!!!!!!!!!!!!! ///////////////////
        pictureFiles?.forEach((el:any)=>{
            pictureFiles && uploadFile(el);
        })
    },[pictureFiles ])
    return {pictureURL, succesPictureUpload}
}

