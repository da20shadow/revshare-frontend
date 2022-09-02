import {get, post, patch, del} from "./requester";

const path = 'users/'

/** -------------GET------------- **/
export const getAccountStat = (token) => {
    return get(path,token);
}

export const getReferrals = (token) => {
    return get(`${path}referrals`,token);
}

/** -------------POST------------- **/
export const login = (userData) => {
    return post(path, userData);
}
export const register = (userData) => {
    return post(path, userData);
}
export const update = (userData,token) => {
    return patch(path, userData, token);
}
export const deleteUser = (token) => {
    return del(path, '', token);
}