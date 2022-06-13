const createCommentPostAdapter = (commentPost) => {
  return {
    post: commentPost.post,
    user: commentPost.user,
    description: commentPost.description,
  }
}

module.exports = {
  createCommentPostAdapter,
}