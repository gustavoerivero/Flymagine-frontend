import React, { useState, useCallback } from 'react'
import { RefreshControl, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { VStack, Box, StatusBar, FlatList, Stack } from 'native-base'

//Components
import Post from '../components/Post/Post'
import TopBar from '../components/TopBar'

import useAuthContext from '../hooks/useAuthContext'

import { getFollows } from '../services/user/userAPI'
import { getFeed } from '../services/post/postAPI'
import COLORS from '../components/styled-components/Colors'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const STYLES = ['default', 'dark-content', 'light-content']
const TRANSITIONS = ['fade', 'slide', 'none']

const HomeView = ({ navigation }) => {
  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [follows, setFollows] = useState([])

  const [posts, setPosts] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {
      getFollows(user?.id)
        .then((res) => {
          setFollows(res?.Data?.follows)

          let followsReceived = res?.Data?.follows

          if (followsReceived?.length >= 0) {
            let f = followsReceived.map((follow) => follow._id)
            f.push(user?.id)

            getFeed(f)
              .then((res) => {
                setPosts(res?.Data)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])
  )

  const [hidden, setHidden] = useState(false)
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0])
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  )

  return (
    <Box w={layout.width}>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <TopBar />
      <VStack w={layout.width} h={layout.height * 0.85} px={2} bg={COLORS.base}>
        {posts && (
          <FlatList
            py={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            data={posts}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => (
              <Stack p={0.5}>
                <Post key={item._id} post={item} navigation={navigation} />
              </Stack>
            )}
          />
        )}
      </VStack>
    </Box>
  )
}

export default HomeView
