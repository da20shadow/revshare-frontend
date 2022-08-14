import {createContext,useContext,useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const StateContext=  createContext();

const initialAccountStat = {
    balance: '',
    shares: '',
    withdrawals: ''
}
const initialAuthState = {id:'',username:'',email:'',token:''}

export const ContextProvider = ({children}) => {

    const [user,setUser] = useLocalStorage('user',initialAuthState)
    const [accountStat, setAccountStat] = useState(initialAccountStat);

    const loginUser = (userData) => {
        setUser(userData);
    }
    const logoutUser = () => {
        setAccountStat(initialAccountStat)
        setUser(initialAuthState);
    }

    return (
        <StateContext.Provider
            value={
                {user, isLogged: user.email, setUser,loginUser,logoutUser,
                    accountStat, setAccountStat
                }
            }
            >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);