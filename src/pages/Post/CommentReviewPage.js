import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Stack, VStack } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { FAB } from '@rneui/themed'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentReviewHeader from '../../components/Post/CommentReviewHeader'
import CommentReview from '../../components/Post/CommentReview'
import CommentInput from '../../components/Post/CommentInput'
import { getComments, createComment } from '../../services/comments/commentReviewAPI'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'

import { commentSchema, commentDefaultValue } from '../../utils/formValidations/dataCommentValidation'

const CommentReviewPage = ({ navigation, route }) => {

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [review, setReview] = useState(route.params.review || {})
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
      getComments(review?._id)
        .then(res => {
          setComments(res)
        })
        .catch(error => {
          console.log(error)
        })
    }, [review])
  )

  const onSubmit = async (values) => {

    startLoading()

    try {

      const response = await createComment({
        'idReview': review._id,
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
            <CommentReviewHeader
              navigation={navigation}
              post={review}
            />
          </Stack>
          {comments && comments?.map((element) =>
            <CommentReview
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

export default CommentReviewPage