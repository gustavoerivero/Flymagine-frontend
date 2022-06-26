import React, { useState, useCallback } from 'react'
import { RefreshControl, ActivityIndicator } from 'react-native'
import { Image, VStack, Text, Stack, FlatList } from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'
import DontKnow from '../../../../assets/images/dontknow.png'

import useAuthContext from '../../../hooks/useAuthContext'
import { getPostByUser } from '../../../services/post/postAPI'
import Post from '../../Post/Post'
import { useFocusEffect } from '@react-navigation/native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const PostFeedProfile = ({ navigation, userInfo }) => {

  const {
    state: { user },
  } = useAuthContext()

  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)

  const onRefresh = React.useCallback(() => {
    setPosts([])
    setIsNextPage(true)
    setCurrentPage(1)
    getPosts()
  }, [])

  const getPosts = () => {

    console.log('Post Feed Profile Page: ', currentPage)

    if (isNextPage) {

      setIsLoading(true)
      getPostByUser(userInfo?._id || user?.id, currentPage)
        .then((res) => {
          
          let postsReceived = res?.docs

          setIsNextPage(res?.hasNextPage)
          console.log(`Have Next User Page: ${res?.hasNextPage ? 'Yes' : 'No'}`)

          if (postsReceived?.length > 0) {
            posts.map((post) => {
              postsReceived = postsReceived.filter((p) => p._id !== post._id)
            })
            setPosts([...posts, ...postsReceived])
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPosts()
    }, [currentPage])
  )

  const renderItem = ({ item }) => {
    return (
      <Stack px={0.5} pb={1}>
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

  return (
    <VStack
      px={1}
      minH={layout.height * 0.5}
      minW={layout.width}
      pb={layout.height * 0.2}
      mb={layout.height * 0.20}
    >
      {posts?.length === 0 && !isLoading ? (
        <VStack alignItems='center'>
          <Image
            source={DontKnow}
            alt='DontKnow'
            resizeMode='contain'
            size={300}
          />
          <Text bold textAlign='center' color={COLORS.primary}>
            {user.id === userInfo?._id
              ? 'No tienes publicaciones aún...'
              : 'Este usuario no ha publicado aún...'}
          </Text>
        </VStack>
      ) : (
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
      )}
    </VStack>
  )
}

export default PostFeedProfile
