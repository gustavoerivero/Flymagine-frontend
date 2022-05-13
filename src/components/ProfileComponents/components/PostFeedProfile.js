import React, { useState, useEffect } from 'react'
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

const PostFeedProfile = ({ navigation }) => {

  const layout = useWindowDimensions()

  const {
    state: { user }
  } = useAuthContext()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPostByUser(user?.id)
      .then(res => {
        setPosts(res?.Data?.reverse())
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <ScrollView>
      <VStack 
        space={2} 
        minH={layout.height} 
        minW={layout.width}
        m={2}
        pr={4}
        mb={20} 
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
              No tienes publicaciones aún
            </Text>
          </Box>
        )}
      </VStack>

    </ScrollView>
  )
}

export default PostFeedProfile