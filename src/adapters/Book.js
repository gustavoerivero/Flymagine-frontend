const createBookAdapter = (values) => {
  return {
    user: values.idUser,
    name: values.name,
    synopsis: values.synopsis,
    photo: 'none',
    document: 'none',
    creationDate: values.creationDate
  }
}

const updateBookAdapter = (values) => {
  return {
    user: values.user,
    name: values.name,
    synopsis: values.synopsis,
    creationDate: values.creationDate
  }
}

module.exports = {
  createBookAdapter,
  updateBookAdapter,
}