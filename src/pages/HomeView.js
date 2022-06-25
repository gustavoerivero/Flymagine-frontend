import React, { useState, useCallback } from 'react'
import { RefreshControl, useWindowDimensions, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { VStack, Box, StatusBar, Image, FlatList, Stack, Text } from 'native-base'

import DontKnow from '../../assets/images/dontknow.png'

//Components
import Post from '../components/Post/Post'
import TopBar from '../components/TopBar'

import useAuthContext from '../hooks/useAuthContext'

import { getFollows } from '../services/user/userAPI'
import { getFeed } from '../services/post/postAPI'
import COLORS from '../components/styled-components/Colors'

const HomeView = ({ navigation }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setPosts([])
    setCurrentPage(1)
    getPosts()
  }, [])

  const getPosts = () => {
    console.log('page: ', currentPage)
    setIsLoading(true)
    getFollows(user?.id)
      .then((res) => {
        let followsReceived = res?.Data?.follows
        if (followsReceived?.length >= 0) {
          let f = followsReceived.map((follow) => follow._id)
          f.push(user?.id)
          getFeed(f, currentPage)
            .then(res => {

              let postsReceived = res?.docs
              if (postsReceived?.length > 0) {
                posts.map((post) => {
                  postsReceived = postsReceived.filter((p) => p._id !== post._id)
                })
                setPosts([...posts, ...postsReceived])
              }
              setIsLoading(false)
            })
            .catch(err => {
              console.log(err)
              setIsLoading(false)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderItem = ({ item }) => {
    return (
      <Stack p={0.5}>
        <Post key={item._id} post={item} navigation={navigation} />
      </Stack>
    )
  }

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </Stack>
    )
  }

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  }

  useFocusEffect(
    useCallback(() => {
      getPosts()
    }, [currentPage])
  )

  return (
    <Box w={layout.width} >
      <StatusBar animated={true} backgroundColor={COLORS.primary} />
      <TopBar onRefresh={onRefresh} />
      <VStack w={layout.width} h={layout.height * 0.85} px={2} bg={COLORS.base}>
        {posts?.length === 0 && !isLoading ?
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
          </VStack> :
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={posts}
            keyExtractor={item => item?._id?.toString()}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
          />
        }
      </VStack>
    </Box>
  )
}

export default HomeView
