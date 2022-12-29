import {UploadForm} from '../../Form/UploadForm'
import classes from './UploadAdminPanel.module.css'
export  const UploadAdminPanel: React.FC = (props) =>{
    return <div className={classes.uploader}>
        <UploadForm/>
    </div>
}
