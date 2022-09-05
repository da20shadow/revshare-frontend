import {post, get, del, patch} from "./requester";

const path = 'shares/'

export const publish = (orderInfo,token) => {
    return post(path,orderInfo,token);
}

export const shareDividends = (data,token) => {
    return post('share/dividends',data,token);
}

export const update = (orderInfo,token) => {
    return patch(path,orderInfo,token);
}

export const cancel = (orderId,token) => {
    return del(path,{orderId},token);
}

export const buy = (orderOwnerId,quantity,orderId,token) => {
    return post(`${path}${orderId}`, {orderOwnerId,quantity},token);
}

export const getProfitHistory = (token) => {
    return get('share/dividends/',token);
}

export const getAll = (token) => {
    return get(path,token);
}

export const getUserShares = (token) => {
    return get(`user/shares/`,token);
}

export const getSharesStat = () => {
    return get('shares/stat');
}