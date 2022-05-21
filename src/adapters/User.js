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

const updateDataUserAdapter = (values) => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    address: values.address,
    biography: values.biography,
  }
}

const updateAccessDataAdapter = (values) => {
  return {
    email: values.email,
    password: values.currentPassword,
    newPassword: values.password
  }
}

const personalPreferencesData = (values) => {
  return values.literaryGenres
}

module.exports = {
  loginData,
  registerData,
  updateDataUserAdapter,
  updateAccessDataAdapter,
  personalPreferencesData,
}