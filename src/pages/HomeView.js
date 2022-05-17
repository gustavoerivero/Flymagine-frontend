import React, { useState, useCallback } from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { VStack } from 'native-base'

//Components
import StatusBar from "../components/StatusBar"
import Container from '../components/Container'
import Post from '../components/Post/Post'

import useAuthContext from '../hooks/useAuthContext'

import { getFollows } from '../services/user/userAPI'
import { getPosts, getFeed } from '../services/post/postAPI'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const HomeView = ({ navigation }) => {

  const {
    state: { user },
  } = useAuthContext()

  const [follows, setFollows] = useState([])
  const [users, setUsers] = useState([])

  const [posts, setPosts] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {

      getFollows(user?.id)
        .then(res => {
          setFollows(res?.Data?.follows)
          console.log(follows)

          if (follows?.length > 0) {
            let f = follows.map(follow => follow._id)
            f.push(user?.id)
            setUsers(f)
            
            getFeed(users)
              .then(res => {
                setPosts(res?.Data?.reverse())
              })
              .catch(err => {
                console.log(err)
              })
          }

        })
        .catch(err => {
          console.log(err)
        })

    }, [follows])
  )

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