import { LoginForm } from "../../Components/AdminPage/LoginForm/LoginForm"
import { useContext } from 'react'
import {AuthContext} from '../../Store/Auth-context'
import { UploadAdminPanel } from "../../Components/AdminPage/Uploader/UploadAdminPanel"
const Admin: React.FC = ():JSX.Element =>{
    const {loggedIn} = useContext(AuthContext)
    return (
        <>
        {(loggedIn === false) && <LoginForm/>}
        {(loggedIn === true) && <UploadAdminPanel/>}
        </>

    )
}

export default Admin