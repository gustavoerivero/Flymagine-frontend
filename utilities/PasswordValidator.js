import RegEx from './RegEx';

const PasswordValidator = (password) => {
   return RegEx.regPassword.test(password) ? true : false
}

export default PasswordValidator