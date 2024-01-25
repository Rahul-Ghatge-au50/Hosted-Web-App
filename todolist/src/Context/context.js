import { createContext, useReducer, useEffect } from "react"
import Reducer from "./reducer";


const INTIAL_STATE = {
    user: JSON.parse(localStorage.getItem("User")) ||  null,
    isLoading:false,
    error:false
}


export const UserContext = createContext(INTIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,INTIAL_STATE);

    useEffect(() => {
        localStorage.setItem("User", JSON.stringify(state.user))
    }, [state.user])

    return (
        <UserContext.Provider
            value={{
                user:state.user,
                loading:state.isLoading,
                error:state.error,
                dispatch
            }}>
            {children}
        </UserContext.Provider>
    )
}