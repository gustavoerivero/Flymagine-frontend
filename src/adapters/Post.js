const postAdapter = (values) => {
  return {
    idUser: values.idUser,
    description: values.description
  }
}

module.exports = {
  postAdapter,
}