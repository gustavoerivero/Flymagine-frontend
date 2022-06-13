const reviewAdapter = (values) => {
  return {
    user: values.user,
    book: values.user,
    description: values.description,
    rating: values.rating,
  }
}

module.exports = {
  reviewAdapter,
}