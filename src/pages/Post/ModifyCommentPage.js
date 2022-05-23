import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView, VStack } from 'native-base'
import { FAB } from '@rneui/themed'
import { FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CommentInput from '../../components/Post/CommentInput'
import CommentModify from '../../components/Post/CommentModify'
import { handleChange, } from '../../utils/functions'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById } from '../../services/user/userAPI'
import { updateComment } from '../../services/comments/commentPostAPI'

const ModifyCommentPage = ({ navigation, route }) => {

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

  return (
    <KeyboardAwareScrollView>
      <VStack h={layout.height * .94}>
        <ScrollView>
          <VStack maxH='65%' >
            <CommentModify
              comment={comment}
              user={userData}
            />
          </VStack>
        </ScrollView>

        <VStack justifyContent='flex-end'>
          <CommentInput
            value={comment.description}
            onChangeText={(text) => _handleChange('description', text)}
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

                  updateComment(comment._id, { description: comment.description })
                    .then(res => {
                      console.log(res)

                      showSuccessToast('¡Misión cumplida! Has editado un comentario')
                      navigation?.goBack()
                    })
                    .catch(error => {
                      console.log(error)
                      showErrorToast('¡Misión fallida! No se ha podido editar el comentario')
                    })
                  stopLoading()
                }}
              />
            }
          />
        </VStack>

      </VStack>

    </KeyboardAwareScrollView>
  )
}

export default ModifyCommentPage