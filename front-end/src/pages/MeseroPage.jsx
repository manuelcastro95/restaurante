import { Navigate, useNavigate } from "react-router-dom";

function MeseroPage({user}){
    if(user != "mesero" || !user){
        return <Navigate to="/"/>
    }
    
    return(
        <h1>Pagina Mesero</h1>
    )
}

export default MeseroPage;