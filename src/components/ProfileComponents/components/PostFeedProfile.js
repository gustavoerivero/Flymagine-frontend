import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import {
  View,
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  ScrollView,
} from 'native-base'
import { useWindowDimensions } from 'react-native'
import COLORS from '../../styled-components/Colors'

import useAuthContext from '../../../hooks/useAuthContext'
import { getPostByUser } from '../../../services/post/postAPI'
import Post from '../../Post/Post'
import { useFocusEffect } from '@react-navigation/native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const PostFeedProfile = ({ navigation, userInfo }) => {

  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const {
    state: { user }
  } = useAuthContext()

  const [posts, setPosts] = useState([])

  useFocusEffect(
    useCallback(() => {
      getPostByUser(userInfo?._id || user?.id)
        .then(res => {
          setPosts(res?.Data?.reverse())
        })
        .catch(error => {
          console.log(error)
        })
    }, [])
  )

  return (
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
        minH={layout.height}
        minW={layout.width}
        m={2}
        pr={4}
        mb={layout.height * .2}
      >
        {posts?.length > 0 && posts ? posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            navigation={navigation}
          />
        )) : (
          <Box
            p={1}
          >
            <Text
              bold
              fontSize='sm'
              color={COLORS.primary}
            >
              {user.id === userInfo?._id ? 'No tienes publicaciones aún...' : 'Este usuario no ha publicado aún...'}
            </Text>
          </Box>
        )}
      </VStack>

    </ScrollView>
  )
}

export default PostFeedProfile