import {get,post, put, del} from "./requester";
import {getUser} from "../utils/utils";

const path = 'users/'
const token = getUser() ? getUser().token : '';

/** -------------GET------------- **/
export const getAccountStat = () =>{
    return get(path,token);
}

/** -------------POST------------- **/
export const login = (userData) => {
    return post(path,userData);
}
export const register = (userData) => {
    return post(path,userData);
}
export const update = (userData) => {
    return put(path,userData,token);
}
export const deleteUser = () => {
    return del(path,token);
}