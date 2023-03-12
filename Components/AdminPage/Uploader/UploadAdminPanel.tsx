
import { uploaderEdit } from "../../../Data/Data"
import { CustomHeader } from "../../UI/Texts/CustomHeader";
import classes from './UploadAdminPanel.module.css'
import { UploaderSquare } from "./UploaderSquare";
export  const UploadAdminPanel: React.FC = (props):JSX.Element =>{
    return(
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