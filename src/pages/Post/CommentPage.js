import React, { useState, useCallback } from 'react'
import { useWindowDimensions, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Stack, VStack, FlatList } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { FAB } from '@rneui/themed'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentPost from '../../components/Post/CommentPost'
import Comment from '../../components/Post/Comment'
import CommentInput from '../../components/Post/CommentInput'
import {
  getComments,
  createComment,
} from '../../services/comments/commentPostAPI'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'

import {
  commentSchema,
  commentDefaultValue,
} from '../../utils/formValidations/dataCommentValidation'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const CommentPage = ({ navigation, route }) => {
  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [post, setPost] = useState(route.params.post || {})
  const [comments, setComments] = useState(route.params.comments || [])

  const layout = useWindowDimensions()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

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
        .then((res) => {
          setComments(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [comments])
  )

  const onSubmit = async (values) => {
    startLoading()

    try {
      const response = await createComment({
        post: post._id,
        user: user.id,
        description: values.description,
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
    <KeyboardAwareScrollView>
      <ScrollView>
        <VStack minH={layout.height * 0.81} >
          <Stack /* POST */ alignItems='center'
            w='100%'
            p={2}
            justifyContent='center'
          >
            <CommentPost navigation={navigation} post={post} />
          </Stack>
          <VStack /* POST COMENTARIES */ alignItems='flex-start'
            ml={1}
            w='95%'
          >
            {comments.length > 0 && comments.map((comment, index) => (
              <Comment
                key={index.toString()}
                comment={comment}
                navigation={navigation}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>

      <VStack>
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
                  icon={<FontAwesome name='send' color='#fff' size={20} />}
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
    </KeyboardAwareScrollView>
  )
}

export default CommentPage
