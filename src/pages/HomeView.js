import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { VStack } from 'native-base'

//Components
import StatusBar from "../components/StatusBar"
import Container from '../components/Container'
import Post from '../components/Post/Post'

import { getPosts } from '../services/post/postAPI'

const HomeView = ({ navigation }) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
      .then(res => {
        setPosts(res.reverse())
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container>
      <StatusBar />
      <ScrollView>
        <VStack
          space={2}
        >
          { posts?.length > 0 && posts ? posts.map((post, index) => (
              <Post
                key={index}
                post={post}
                navigation={navigation}
              />
            )) : null
          }          
        </VStack>

      </ScrollView>
    </Container>
  )
}

export default HomeView