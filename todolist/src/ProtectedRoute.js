import { useContext } from "react"
import { UserContext } from "./Context/context"
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user} = useContext(UserContext);

    if(user){
        return children
    }else{
        return <Navigate to='/Login' />
    }
}   

export default ProtectedRoute