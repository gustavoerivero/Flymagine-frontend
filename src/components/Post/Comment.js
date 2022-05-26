import React, { useState, useCallback } from 'react'
import {
  AlertDialog,
  Button,
  Avatar,
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Icon
} from 'native-base'

import { parseDate, parseTime } from '../../utilities/Parsers'
import { previousFourteenHours } from '../../utils/functions'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import COLORS from '../styled-components/Colors'

import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById, getOnlyUser } from '../../services/user/userAPI'
import { updateComment, deleteComment } from '../../services/comments/commentPostAPI'
import { useFocusEffect } from '@react-navigation/native'

const Comment = ({ navigation, comment = {} }) => {

  const layout = useWindowDimensions()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    state: { user }
  } = useAuthContext()

  const [userLogged, setUserLogged] = useState(null)
  const [userComment, setUserComment] = useState(null)

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(comment?.usersLiked?.length || 0)

  const [deleteVisible, setDeleteVisible] = useState(false)

  const deleteCommentById = async () => {
    try {
      await deleteComment(comment?._id)
      navigation?.navigate('Home')
      showSuccessToast('¡Misión cumplida! El comentario eliminado con éxito')
    } catch (error) {
      console.log(error)      
      showErrorToast('¡Misión fallida! El comentario no pudo ser eliminado')
    }
  }

  const likePost = async () => {
    try {
      let newValue = comment?.usersLiked
      if (newValue?.find((value) => userLogged._id === value)) {
        newValue?.splice(newValue?.findIndex((reactionUser) => userLogged?._id === reactionUser), 1)
      } else {
        newValue?.push(userLogged)
      }

      await updateComment(comment?._id, { usersLiked: newValue })
      setLikes(newValue?.length)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOnlyUser(user?.id)
        .then(res => {
          setUserLogged(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })
      getUserById(comment?.idUser)
        .then(res => {
          setUserComment(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })

      setIsLiked(comment?.usersLiked?.find((value) => user.id === value))

    }, [])
  )

  return (
    <Box
      p={2}
      bgColor='white'
      rounded='lg'
      shadow={2}
      pb={2}
    >
      <HStack>
        <TouchableOpacity
          onPress={() => {
            console.log(`${userComment?.firstName + ' ' + userComment?.lastName}'s profile`)
            console.log(userPost._id)
            if (userComment?._id === user?.id) {
              navigation.navigate('Profile')
            } else {
              navigation.navigate('UserProfile', { user: userComment._id })
            }
          }}
        >
          <Avatar
            bg='purple.600'
            size='md'
            source={{
              uri: (userComment?.photo === 'none' ? null : userComment?.photo)
            }}
            borderColor='white'
            borderWidth={3}
          >
            {userComment && (userComment?.firstName[0] + userComment?.lastName[0])}
          </Avatar>
        </TouchableOpacity>
        <VStack
          ml={2}
        >
          <HStack
            space={2}
            justifyContent='space-between'
            alignItems='center'
            h={7}
            mr={2} 
            w={290}           
            maxW={290}
          >
            <HStack
              space={2}
            >
              <Text
                bold
                fontSize='sm'
              >
                {userComment?.firstName} {userComment?.lastName}
              </Text>
              <Text
                fontSize={10}
                color='gray.300'
                alignSelf='center'
              >
                {parseDate(comment?.createdAt) + ' ' + parseTime(comment?.createdAt)}
              </Text>
            </HStack>

            {(user?.id === comment?.idUser && previousFourteenHours(comment?.createdAt)) && (
              <HStack
                alignItems='flex-end'
              >
                <IconButton
                  icon={
                    <FontAwesome
                      name='edit'
                      color='gray.300'
                    />
                  }
                  size='sm'
                  onPress={() => {
                    console.log(comment?._id)
                    navigation.navigate('ModifyCommentPage', { 
                      comment: comment,
                    })
                  }}
                />
                <IconButton
                  icon={
                    <FontAwesome
                      name='trash'
                      color='gray.300'
                    />
                  }
                  size='sm'
                  onPress={() => {
                    setDeleteVisible(true)
                  }}
                />
                <AlertDialog
                  isOpen={deleteVisible}
                  onClose={() => {
                    setDeleteVisible(false)
                  }}
                >
                  <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>
                      Eliminación de comentario
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      ¿Estás seguro de que quieres eliminar este comentario?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button.Group space={2}>
                        <Button
                          variant='unstyled'
                          colorScheme='coolGray'
                          onPress={() => {
                            setDeleteVisible(false)
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          colorScheme='danger'
                          onPress={() => {
                            try {
                              deleteCommentById()
                              setDeleteVisible(false)
                              navigation?.navigate('Home')
                            } catch {
                              showErrorToast('Error eliminando el comentario')
                            }
                          }}
                        >
                          Eliminar
                        </Button>
                      </Button.Group>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog>
              </HStack>
            )}

          </HStack>

          <VStack>
            <Stack
              w={layout.width * .73}
              mx={2}
              mb={2}
            >
              <Text fontSize='xs' textAlign='justify' >
                {comment?.description}
              </Text>
            </Stack>
            <Divider />

            <HStack
              w={layout.width * .73}
              mt={1}
              justifyContent='flex-end'
              space={4}
            >

              <TouchableOpacity
                onPress={() => {
                  setIsLiked(!isLiked)
                  likePost()
                  if (isLiked) {
                    setLikes(likes - 1)
                  } else {
                    setLikes(likes + 1)
                  }
                }}
              >
                <HStack space={1} alignItems='center' >
                  <Icon
                    as={MaterialIcons}
                    name='thumb-up'
                    color={isLiked ? COLORS.button.secundary : 'gray.400'}
                  />
                  <Text fontSize='xs' color={'gray.400'} >
                    {likes}
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>

          </VStack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default Comment
