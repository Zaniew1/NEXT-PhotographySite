import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../Firebase/firebase-config';
import {useState, useEffect,} from 'react';

export const useFirestorage = (pictureFile:any) => {
    const [pictureURL, setPictureURL] = useState<string>('');
    useEffect(()=>{
        const uploadFile = () => {
            const name = new Date().getTime() + String(pictureFile);
            const storage  =  ref(firebaseStorage, name );
            const uploadTask = uploadBytesResumable(storage, pictureFile);
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
                    setPictureURL(downloadURL);
                    console.log('Upload is Done')
                });
            });
        }
        pictureFile&& uploadFile();
    },[pictureFile])
    return pictureURL
}

