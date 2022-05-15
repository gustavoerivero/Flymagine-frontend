import React, { useState, useEffect } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { VStack } from 'native-base'

//Components
import StatusBar from "../components/StatusBar"
import Container from '../components/Container'
import Post from '../components/Post/Post'

import { getPosts } from '../services/post/postAPI'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const HomeView = ({ navigation }) => {

  const [posts, setPosts] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
    getPosts()
      .then(res => {
        setPosts(res.reverse())
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <VStack
          space={2}
        >
          {posts && posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              navigation={navigation}
            />
          ))}
        </VStack>

      </ScrollView>
    </Container>
  )
}

export default HomeView