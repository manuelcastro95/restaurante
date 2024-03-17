import { Navigate, useNavigate } from "react-router-dom";

function CocinaPage({user}){
    if(user != "cocina" || !user){
        return <Navigate to="/"/>
    }
    
    return(
        <h1>Pagina Cocina</h1>
    )
}

export default CocinaPage;