import React, { useState, useCallback } from 'react'
import { useWindowDimensions, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Stack, VStack, FlatList } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { FAB } from '@rneui/themed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentReviewHeader from '../../components/Post/CommentReviewHeader'
import CommentReview from '../../components/Post/CommentReview'
import CommentInput from '../../components/Post/CommentInput'
import {
  getComments,
  createComment,
} from '../../services/comments/commentReviewAPI'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'

import {
  commentSchema,
  commentDefaultValue,
} from '../../utils/formValidations/dataCommentValidation'
import COLORS from '../../components/styled-components/Colors'

const CommentReviewPage = ({ navigation, route }) => {
  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [review, setReview] = useState(route.params.review || {})
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
      getComments(review?._id)
        .then((res) => {
          setComments(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [review])
  )

  const onSubmit = async (values) => {
    startLoading()

    try {
      const response = await createComment({
        review: review._id,
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
      <VStack h={layout.height * .93}>
        <Stack /* REVIEW */ alignItems='center' w='100%' h='20%' p={2} justifyContent='center'>
          <CommentReviewHeader navigation={navigation} post={review} />
        </Stack>
        <VStack /* REVIEW COMENTARIES */ alignItems='flex-start' maxH='68%' ml={1} w='95%'>
          {comments && (
            <FlatList
              py={2}
              scrollEnabled
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              data={comments}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => (
                <Stack p={1}>
                  <CommentReview
                    key={item._id}
                    comment={item}
                    navigation={navigation}
                  />
                </Stack>
              )}
            />
          )}
        </VStack>

        <VStack h='12%'>
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
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default CommentReviewPage
