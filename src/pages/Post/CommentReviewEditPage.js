import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView, Box, TextArea, Stack, Icon, HStack, VStack, Button } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentModify from '../../components/Post/CommentModify'
import { handleChange, } from '../../utils/functions'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById } from '../../services/user/userAPI'
import { updateComment } from '../../services/comments/commentReviewAPI'

import { commentSchema, commentDefaultValue } from '../../utils/formValidations/dataCommentValidation'

import COLORS from '../../components/styled-components/Colors'

const CommentReviewEditPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [height, setHeight] = useState(20)

  const [comment, setComment] = useState({
    _id: route.params.comment._id,
    post: route.params.comment.post,
    user: route.params.comment.user,
    description: route.params.comment.description,
    createdAt: route.params.comment.createdAt,
    usersLiked: route.params.comment.usersLiked || [],
  })

  const _handleChange = (item, value) => handleChange(comment, setComment, item, value)

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

  const onSubmit = async (values) => {
    startLoading()
    try {

      const response = await updateComment(comment._id, values)
      console.log(response)

      reset(commentDefaultValue)
      showSuccessToast('¡Misión cumplida! El comentario ha sido modificado con éxtio')
      navigation.goBack()

    } catch (error) {
      console.log(error)
      showErrorToast('¡Misión fallida! Ha ocurrido un error')
    }
    stopLoading()
  }

  return (
    <KeyboardAwareScrollView>
      <VStack h={layout.height * .93}>
        <ScrollView>
          <VStack maxH='100%' alignItems='center' p={2}>
            <CommentModify
              comment={comment}
            />
          </VStack>
        </ScrollView>

        <VStack justifyContent='flex-end'>
          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value = comment.description, ...field } }) => (
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
                      {...field}
                      value={value}
                      onChangeText={(text) => {
                        onChange(text)
                        _handleChange('description', text)
                      }}
                      placeholder='¿Tienes algo que decir?'

                    />
                  </Stack>
                  <Stack w='15%' alignItems='center' alignContent='center'>
                    <Button
                      leftIcon={<FontAwesome name='send' color='#fff' size={20} />}
                      colorScheme='purple'
                      borderRadius={100}
                      isDisabled={!isValid || isLoading}
                      isLoading={isLoading}
                      onPress={handleSubmit(onSubmit)}
                    />
                  </Stack>
                </HStack>
              </Box>
            )}
          />
        </VStack>

      </VStack>

    </KeyboardAwareScrollView>
  )
}

export default CommentReviewEditPage