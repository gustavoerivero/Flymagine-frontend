import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView, VStack } from 'native-base'
import { FAB } from '@rneui/themed'
import { FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentInput from '../../components/Post/CommentInput'
import CommentModify from '../../components/Post/CommentModify'
import { handleChange, } from '../../utils/functions'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById } from '../../services/user/userAPI'
import { updateComment } from '../../services/comments/commentReviewAPI'

import { commentSchema, commentDefaultValue } from '../../utils/formValidations/dataCommentValidation'

const CommentReviewEditPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [userData, setUserData] = useState(null)
  const [comment, setComment] = useState({
    _id: route.params.comment._id,
    idPost: route.params.comment.idPost,
    idUser: user.id,
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

  useFocusEffect(
    useCallback(() => {

      getUserById(user?.id)
        .then(res => {
          setUserData(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })

    }, [])
  )

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
              user={userData}
            />
          </VStack>
        </ScrollView>

        <VStack justifyContent='flex-end'>
          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value = comment.description, ...field } }) => (
              <CommentInput
                {...field}
                value={value}
                onChangeText={(text) => {
                  onChange(text)
                  _handleChange('description', text)
                }}
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

      </VStack>

    </KeyboardAwareScrollView>
  )
}

export default CommentReviewEditPage