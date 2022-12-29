import {useUploader} from '../../../hooks/useUploader'
import {useEffect} from 'react'
import {SelectedFileToUploadType, SetFileType} from '../../../Types/types'
import classes from './ProgressBar.module.css'
export const ProgressBar = (props:{ file: SelectedFileToUploadType, setFile: SetFileType}) =>{
//     const {url, progress} = useUploader(props.file);
//     useEffect(()=>{
//         if(url){
//             props.setFile(null);
//         }
//     }, [url, props])
//     return <div className={classes.progress__bar} style={{width: progress + '%'}}></div>
}