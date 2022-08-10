export const invalidUserInputs = (userInputs) => {
    const usernamePattern = /^[a-z][a-z0-9]{4,45}$/;
    const emailPattern = /^[a-z][a-z0-9_]{4,45}[@][a-z-]{3,45}[.][a-z]{2,5}$/;

    if (!userInputs.hasOwnProperty('email') && userInputs.email === ''
        || !emailPattern.test(userInputs.email)){
        alert('Invalid Email!');
        return false;
    }
    if (!userInputs.hasOwnProperty('password') || userInputs.password === '') {
        alert('Invalid password!')
        return false;
    }
    if (userInputs.hasOwnProperty('username') || userInputs.username === ''
        || !usernamePattern.test(userInputs.username) ) {
        alert('Invalid username!');
        return false;
    }
    if (userInputs.hasOwnProperty('rePassword') && userInputs.password !== userInputs.rePassword) {
        alert('Password and re-password do not match!')
        return false;
    }
    return true;
}