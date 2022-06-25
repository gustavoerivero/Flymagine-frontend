const reviewAdapter = (values) => {
  return {
    user: values.user,
    book: values.book,
    description: values.description,
    rating: values.rating,
  }
}

module.exports = {
  reviewAdapter,
}