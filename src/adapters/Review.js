const reviewAdapter = (values) => {
  return {
    idUser: values.userId,
    idBook: values.bookId,
    description: values.description,
    rating: values.rating,
  }
}

module.exports = {
  reviewAdapter,
}