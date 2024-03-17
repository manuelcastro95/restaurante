import { Navigate, useNavigate } from "react-router-dom";

function AdminPage({user}){
    if(user != "administrador" || !user){
        return <Navigate to="/"/>
    }
    
    return(
        <h1>Pagina administrador</h1>
    )
}

export default AdminPage;