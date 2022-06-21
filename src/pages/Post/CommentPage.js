import React, { useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Box, TextArea, Stack, Icon, HStack, VStack, Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentPost from '../../components/Post/CommentPost'
import Comment from '../../components/Post/Comment'
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

import COLORS from '../../components/styled-components/Colors'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const CommentPage = ({ navigation, route }) => {
  const {
    state: { user },
  } = useAuthContext()

  const [height, setHeight] = React.useState(20)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const post = route.params?.post || {}
  const [comments, setComments] = useState(route.params.comments || [])

  const [comment, setComment] = useState(null)

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

  const onSubmit = async () => {
    startLoading()

    try {
      const response = await createComment({
        post: post._id,
        user: user.id,
        description: comment,
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
            <CommentPost 
              navigation={navigation} 
              post={post} 
              hashtags={route.params.hashtags || []}
              personTags={route.params.personTags || []}
            />
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

      <Box
        w={layout.width}
        minH={layout.height * 0.12}
        maxH={layout.height * 0.2}
        bgColor='white'
        py={1}
        px={2}
        justifyContent='center'
      >
        <HStack alignItems='center' w='100%'>
          <Stack w='10%' alignItems='center'>
            <Icon as={FontAwesome} name='comment' size={8} color='#aaa' />
          </Stack>

          <Stack w='75%'>
            <TextArea
              textAlignVertical='center'
              textAlign='justify'
              minH={16}
              h={height}
              maxH={120}
              bgColor={COLORS.base}
              color={COLORS.gray4}
              borderColor={'white'}
              m={1}
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height)
              }}
              variant='unstyled'
              size='md'
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder='¿Tienes algo que decir?'

            />
          </Stack>
          <Stack w='15%' alignItems='center' alignContent='center'>
            <Button
              leftIcon={<FontAwesome name='send' color='#fff' size={20} />}
              colorScheme='purple'
              borderRadius={100}
              isDisabled={comment === '' || !comment}
              isLoading={isLoading}
              onPress={onSubmit}
            />
          </Stack>
        </HStack>
      </Box>
    </KeyboardAwareScrollView>
  )
}

export default CommentPage
