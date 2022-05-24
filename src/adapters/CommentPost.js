const createCommentPostAdapter = (commentPost) => {
  return {
    'idPost': commentPost.idPost,
    'idUser': commentPost.idUser,
    'description': commentPost.description,
  }
}

module.exports = {
  createCommentPostAdapter,
}