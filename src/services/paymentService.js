import {del, get, patch, post} from "./requester";

const path = 'payment/'

/** ------------------GET------------------ **/
export const getProcessors = (token) => {
    return get(path,token);
}

export const getUserWallets = (token) => {
    return get(`wallets/`,token);
}

export const getDeposits = (offset,token) => {
    return get(`deposit/${offset}`,token);
}

export const getPendingDeposits = (offset,token) => {
    return get(`pending-deposits/${offset}`,token);
}

export const getPendingWithdrawals = (offset,token) => {
    return get(`pending-withdrawals/${offset}`,token);
}

export const getWithdrawals = (offset,token) => {
    return get(`withdrawal/${offset}`,token);
}

/** GET CRYPTO PRICE **/
export const getCryptoPrice = async () => {
    const response = await fetch('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,litecoin,dogecoin');
    const result = await response.json();
    if (response.ok){
        return result;
    }else {
        throw result;
    }
}

/** ------------------POST------------------ **/
export const processWithdrawal = (data,token) => {
    return post(path,data,token);
}

export const deposit = (data,token) => {
    return post(`deposit/`,data,token);
}

/** -------------------PATCH------------------- **/
export const updateProcessors = (changedWallets,token) => {
    return patch('wallets/',changedWallets,token);
}

export const completeDeposit = (depositInfo,token) => {
    return patch('deposit/',depositInfo,token);
}

/** ----------------------DELETE---------------------- **/
export const removeDeposit = (deposit_id,token) => {
    return del(`deposit/${deposit_id}`,'',token)
}