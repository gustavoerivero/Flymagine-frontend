import RegEx from './RegEx';

const PasswordValidator = (password) => {
    let regex = new RegExp(RegEx.regPassword)
    return regex.test(password) ? true : false
}

export default PasswordValidator