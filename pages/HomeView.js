import React, {
  useState,
  useEffect
} from 'react'
import {
  ScrollView
} from 'react-native'

import Container from '../components/Container'

import Post from '../components/Post/Post'

import dataPosts from '../utilities/data/posts'

const HomeView = ({ params }) => {

  const [signIn, setSignIn] = useState('Adam Meddler')

  const [posts, setPosts] = useState(dataPosts || [])
  return (
    <Container>
      <ScrollView>
        {posts?.map((post) => (
          <Post
            key={post.id}
            signIn={signIn}
            author={post.owner.firstName + ' ' + post.owner.lastName}
            avatar={post.owner.picture}
            image={post.image}
            description={post.text}
            date={post.publishDate}
            likes={post.likes}
            comments={post.comments}
            tags={post.tags}
          />
        ))}
      </ScrollView>
    </Container>
  )
}

export default HomeView