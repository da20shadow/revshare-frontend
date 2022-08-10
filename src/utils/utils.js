export const getUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user)
    }
    return undefined;
}

export const saveUser = (user) => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const removeUser = () => {
    localStorage.clear();
}