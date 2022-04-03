import RegEx from './RegEx';

const EmailValidator = (email) => {
   return RegEx.regEmail.test(email) ? true : false
}

export default EmailValidator