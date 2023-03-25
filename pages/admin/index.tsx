import { useContext, useEffect,useCallback } from 'react'
import {AuthContext} from '../../Store/Auth-context'
import { useRouter } from 'next/router';
import { uploaderEdit } from "../../Data/Data"
import { CustomHeader } from './../../Components/UI/Texts/CustomHeader'
import classes from './index.module.css'
import { UploaderSquare } from "./../../Components/AdminPage/Uploader/UploaderSquare";

const Admin: React.FC = ():JSX.Element =>{
    const {loggedIn} = useContext(AuthContext)
    console.log(loggedIn)
    const router = useRouter();
        const navigateIfNotLoggedHandler = useCallback((isLogged:boolean) =>{
            if(isLogged){
                router.push('/login');
            }
     }, [router]);
     useEffect(()=>{

         navigateIfNotLoggedHandler(loggedIn);
     },[loggedIn, navigateIfNotLoggedHandler])
    return (
        <div className={classes.upload}>
        <div className={classes.upload__header__wrapper}>
            <CustomHeader text={'Witaj w panelu admina'} customClass={classes.upload__header}/>
        </div>
        <div>
            {uploaderEdit.map(element=>{
                return(
                    <ul key={Math.random()*100}>
                        <UploaderSquare text={element.text} path={element.path}/>

                    </ul>
                    )
                })}
        </div>
    </div>

    )
}

export default Admin