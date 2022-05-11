const loginData = (values) => {
  return {
    email: values.email,
    password: values.password,
  }
}

const registerData = (values) => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    address: values.address,
    birthday: values.birthday,
    email: values.email,
    password: values.password,
    biography: values.biography,
    idRole: values.idRole,
  }
}

const personalPreferencesData = (values) => {
  return {
    idLiteraryGenre: values.idLiteraryGenre,
  }
}

module.exports = {
  loginData,
  registerData,
  personalPreferencesData,
}