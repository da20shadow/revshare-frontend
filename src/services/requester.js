import {removeUser} from "../utils/utils";

const baseUrl = 'http://localhost:8090/Revshare-BackEnd'

const request = async (path,data,token,method) => {

    const options = { method,  headers: {"Content-type":"Application/JSON"} };
    if (data){options.body = JSON.stringify(data)}
    if (token){options.headers['Authorization'] = token}

    const response = await fetch(`${baseUrl}/${path}`,options);
    return responseHandler(response);
}

export const get = (path,token) => {
    return request(path,'',token,'GET');
}
export const post = (path,data,token) => {
    return request(path,data,token,'POST');
}
export const patch = (path,data,token) => {
    return request(path,data,token,'PATCH');
}
export const del = (path,data,token) => {
    return request(path,data,token,'DELETE');
}

async function responseHandler(response){

    const result = await response.json();
    if (response.ok){
        return result;
    }else {
        throw result;
    }
}