import {createContext,useContext,useState} from "react";
import {getUser} from "../utils/utils";

const StateContext=  createContext();

const initialAccountStat = {
    balance: '',
    shares: '',
    withdrawals: ''
}

export const ContextProvider = ({children}) => {

    const [user,setUser] = useState(getUser() ? getUser() : {});
    const [accountStat, setAccountStat] = useState(initialAccountStat);

    return (
        <StateContext.Provider
            value={
                {user, isLogged: user.email, setUser,
                    accountStat, setAccountStat
                }
            }
            >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);