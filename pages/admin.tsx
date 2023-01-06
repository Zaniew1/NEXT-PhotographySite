import { LoginForm } from "../Components/AdminPage/LoginForm/LoginForm"
import { useContext } from 'react'
import {AuthContext} from '../Store/Auth-context'
import { UploadAdminPanel } from "../Components/AdminPage/Uploader/UploadAdminPanel"
const Admin: React.FC = () =>{
    const {loggedIn} = useContext(AuthContext)
    return (
        <>
        {!loggedIn && <LoginForm/>}
        {loggedIn && <UploadAdminPanel/>}
        </>

    )
}

export default Admin