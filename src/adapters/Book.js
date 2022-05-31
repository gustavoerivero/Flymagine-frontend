const createBookAdapter = (values) => {
  return {
    idUser: values.id,
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