import React, { useState, useCallback } from 'react'
import { RefreshControl, useWindowDimensions, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { VStack, Box, StatusBar, Image, FlatList, Stack, Text } from 'native-base'

import DontKnow from '../../assets/images/dontknow.png'

//Components
import Post from '../components/Post/Post'
import TopBar from '../components/TopBar'

import useAuthContext from '../hooks/useAuthContext'
import useLoading from '../hooks/useLoading'

import { getFollows } from '../services/user/userAPI'
import { getFeed } from '../services/post/postAPI'
import COLORS from '../components/styled-components/Colors'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const HomeView = ({ navigation }) => {
  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const { isLoading, startLoading, stopLoading } = useLoading()
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {      
      if(posts.length === 0) {
        startLoading()
      }
      getFollows(user?.id)
        .then((res) => {

          let followsReceived = res?.Data?.follows

          if (followsReceived?.length >= 0) {
            let f = followsReceived.map((follow) => follow._id)
            f.push(user?.id)

            getFeed(f)
              .then((res) => {
                setPosts(res?.Data || [])
                if(posts.length !== 0) {
                stopLoading()
                }
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

  return (
    <Box w={layout.width}>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <TopBar />
      <VStack w={layout.width} h={layout.height * 0.85} px={2} bg={COLORS.base}>
        {posts.length > 0 || !isLoading ? (
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
        )
          : posts.length === 0 ? (
            <VStack alignItems='center' mx={2} my='30%'>
              <Image
                source={DontKnow}
                alt='DontKnow'
                resizeMode='contain'
                size={300}
              />
              <Text bold textAlign='center' color={COLORS.primary}>
                Qué extraño... Parece que aún no has hecho ningún amigo o publicado algo... ¿Qué esperas?
              </Text>
            </VStack>
          )
            : (
              <Stack mt={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
                <ActivityIndicator size='large' color={COLORS.primary} />
              </Stack>
            )}
      </VStack>
    </Box>
  )
}

export default HomeView
