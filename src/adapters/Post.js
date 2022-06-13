const postAdapter = (values) => {
  return {
    user: values.user,
    description: values.description
  }
}

module.exports = {
  postAdapter,
}