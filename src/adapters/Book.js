const createBookAdapter = (values) => {
  return {
    idUser: values.idUser,
    name: values.name,
    sypnosis: values.synopsis,
    photo: 'none',
    document: 'none',
    creationDate: values.creationDate
  }
}

module.exports = {
  createBookAdapter,
}