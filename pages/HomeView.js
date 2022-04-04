import React, {
  useState,
  useEffect
} from 'react'
import {
  Text,
  View
} from 'react-native'

import Container from '../components/Container'

import Post from '../components/Post/Post'
/*
import {
  getPosts,
  baseApi,
  basicAuthApi,
} from '../services/index'
*/

const HomeView = () => {

  const [posts, setPosts] = useState([])
/*
  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data)
      })
  }, 
  */)
     

  const post = [
    {
      author: 'John Doe',
      title: 'Post 1',
      description: 'This is a post 1',
      image: 'https://picsum.photos/200/300',
    },
    {
      author: 'Pedro Pérez',
      title: 'Post 2',
      description: 'This is a post 1',
      image: 'https://picsum.photos/200/300',
    },
  ]

  return (
    <Container>
      <View>
        {post.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
          />
        ))}
      </View>
    </Container>
  )
}

export default HomeView