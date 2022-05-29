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

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentPost from '../../components/Post/CommentPost'
import Comment from '../../components/Post/Comment'
import CommentInput from '../../components/Post/CommentInput'
import { getComments, createComment } from '../../services/comments/commentPostAPI'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'

import { commentSchema, commentDefaultValue } from '../../utils/formValidations/dataCommentValidation'

const CommentPage = ({ navigation, route }) => {

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [post, setPost] = useState(route.params.post || {})
  const [comments, setComments] = useState(route.params.comments || [])

  const layout = useWindowDimensions()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(commentSchema),
    defaultvalue: commentDefaultValue,
  })

  useFocusEffect(
    useCallback(() => {
      getComments(post?._id)
        .then(res => {
          setComments(res)
        })
        .catch(error => {
          console.log(error)
        })
    }, [comments])
  )


  const onSubmit = async (values) => {

    startLoading()

    try {

      const response = await createComment({
        'idPost': post._id,
        'idUser': user.id,
        'description': values.description,
      })

      console.log(response)
      setComments([...comments, response])

      reset(commentDefaultValue)

      showSuccessToast('¡Misión cumplida! El comentario ha sido creado')
    } catch (error) {
      console.log(error)
      showErrorToast('¡Misión fallida! Ha ocurrido un error')
    }

    stopLoading()
  }


  return (
    <ScrollView>
      <VStack minH={layout.height} justifyContent='space-between' space={3}>
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
        <Controller
          name='description'
          control={control}
          render={({ field: { onChange, value = '', ...field } }) => (
            <CommentInput
              {...field}
              value={value}
              onChangeText={onChange}
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
                  disabled={!isValid || isLoading}
                  loading={isLoading}
                  onPress={handleSubmit(onSubmit)}
                />
              }
            />
          )}
        />
      </VStack>
    </ScrollView >
  )
}

export default CommentPage