import {post,get} from "./requester";

const path = 'shares/'

export const publish = (orderInfo,token) => {
    return post(path,orderInfo,token);
}

export const buy = (orderOwnerId,quantity,orderId,token) => {
    return post(`${path}${orderId}`, {orderOwnerId,quantity},token);
}

export const getAll = (token) => {
    return get(path,token);
}

export const getUserShares = (token) => {
    return get(`user/shares/`,token);
}