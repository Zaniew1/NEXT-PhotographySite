import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../Firebase/firebase-config';
import {useState, useEffect,} from 'react';
export const useFirestorage = (pictureFiles:File[]) => {
    const [pictureURL, setPictureURL] = useState<string[]>([]);
    const [succesPictureUpload, setSuccesPictureUpload] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    useEffect(()=>{
        setPictureURL([]); 
            pictureFiles?.forEach((file:File)=>{
                const name = new Date().getTime() + String(file.name);
                const storage  =  ref(firebaseStorage, name );
                const uploadTask = uploadBytesResumable(storage, file);
                uploadTask.on('state_changed', (snapshot)=> {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes * 100));
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
                })
    },[pictureFiles ])
    return {pictureURL, succesPictureUpload, progress, setProgress, setSuccesPictureUpload}
}

