import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  ScrollView,
  Stack,
  VStack,
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { FAB } from '@rneui/themed'

import CommentPost from '../../components/Post/CommentPost'
import Comment from '../../components/Post/Comment'
import CommentInput from '../../components/Post/CommentInput'
import { getComments, createComment } from '../../services/comments/commentPostAPI'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { createCommentPostAdapter } from '../../adapters/CommentPost'

const CommentPage = ({ navigation, route }) => {

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [post, setPost] = useState(route.params.post || {})
  const [comments, setComments] = useState(route.params.comments || [])
  const [comment, setComment] = useState('')

  const layout = useWindowDimensions()

  useFocusEffect(
    useCallback(() => {
      getComments(post?._id)
        .then(res => {
          setComments(res)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])
  )

  return (
    <ScrollView>
      <VStack minH={layout.height * .9 - 30} justifyContent='space-between' space={3}>
        <VStack alignItems='center' space={2}>
          <Stack alignItems='center' w='100%'>
            <CommentPost
              navigation={navigation}
              post={post}
            />
          </Stack>
          {comments && comments?.map((element) =>
            <Comment
              key={element._id}
              comment={element}
              navigation={navigation}
            />
          )}
        </VStack>
        <CommentInput
          value={comment}
          onChangeText={setComment}
          placeholder='¿Tienes algo que decir?'
          rightElement={
            <FAB
              icon={
                <FontAwesome
                  name='send'
                  color='#fff'
                  size={20}
                />
              }
              color='#b973ff'
              containerStyle={{
                position: 'relative',
                marginBottom: 5,
                right: '5%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
              }}
              disabled={comment === '' || isLoading}
              onPress={() => {
                startLoading()
                createComment({
                  'idPost': post._id,
                  'idUser': user.id,
                  'description': comment,
                })
                  .then(res => {
                    console.log(res)

                    setComment('')
                    setComments([...comments, res?.Data])

                    showSuccessToast('¡Misión cumplida! Has creado un comentario')
                  })
                  .catch(error => {
                    console.log(error)
                    showErrorToast('¡Misión fallida! No se ha podido crear el comentario')
                  })
                stopLoading()
              }}
            />
          }
        />
      </VStack>
    </ScrollView >
  )
}

export default CommentPage