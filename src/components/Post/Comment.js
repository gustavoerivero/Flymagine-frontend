import React, { useState, useCallback } from 'react'
import {
  AlertDialog,
  Button,
  Avatar,
  Box,
  Stack,
  Image,
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Icon,
} from 'native-base'

import { parseDate, parseTime } from '../../utilities/Parsers'
import { before24hours } from '../../utils/functions'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import COLORS from '../styled-components/Colors'

import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById, getOnlyUser } from '../../services/user/userAPI'
import {
  updateComment,
  deleteComment,
} from '../../services/comments/commentPostAPI'
import { useFocusEffect } from '@react-navigation/native'

const Comment = ({ navigation, comment = {} }) => {
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    state: { user },
  } = useAuthContext()

  const [userLogged, setUserLogged] = useState(null)

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
      if (newValue?.find((value) => user.id === value)) {
        newValue?.splice(
          newValue?.findIndex(
            (reactionUser) => user?.id === reactionUser
          ),
          1
        )
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
        .then((res) => {
          setUserLogged(res?.Data)
        })
        .catch((error) => {
          console.log('Obteniendo al usuario loggeado', error)
        })
      setIsLiked(comment?.usersLiked?.find((value) => user.id === value))
    }, [])
  )

  return (
    <Box pl={2} pr={1} py={2} m={1} p={1} my={1} bgColor='white' rounded='lg' shadow={2} w='100%'>
      <HStack>
        <Stack /* AVATAR */ w='15%' alignItems='center'>
          <TouchableOpacity
            onPress={() => {
              if (comment?.user?._id === user?.id) {
                navigation.navigate('Profile')
              } else {
                navigation.navigate('UserProfile', { user: comment?.user._id })
              }
            }}
          >
            <Avatar
              bg='purple.600'
              size='md'
              source={{
                uri: comment?.user?.photo === 'none' ? null : comment?.user?.photo,
              }}
              borderColor='white'
              borderWidth={3}
            >
              {comment?.user &&
                comment?.user?.firstName[0] + comment?.user?.lastName[0]}
            </Avatar>
          </TouchableOpacity>
        </Stack>

        <VStack /* INFO */ px={1} w='85%'>
          <HStack /* USER & BUTTONS */ w='100%'
            h={7}
            justifyContent='space-between'
            alignItems='center'
          >
            <HStack /* NAME & DATE */ w='80%' space={2}>
              <Text bold fontSize='sm'>
                {comment?.user?.firstName} {comment?.user?.lastName}
              </Text>
              <Text fontSize={10} color='#806e91' alignSelf='center'>
                {parseDate(comment?.createdAt) +
                  ' ' +
                  parseTime(comment?.createdAt)}
              </Text>
            </HStack>

            {user?.id === comment?.user._id &&
              before24hours(comment?.createdAt) && (
                <HStack /* BUTTONS */ w='20%' alignItems='flex-end'>
                  <IconButton
                    icon={<FontAwesome name='edit' color='#806e91' />}
                    size='sm'
                    onPress={() => {
                      navigation.navigate('ModifyCommentPage', {
                        comment: comment,
                      })
                    }}
                  />
                  <IconButton
                    icon={<FontAwesome name='trash' color='#806e91' />}
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
                                showErrorToast(
                                  'Error eliminando el comentario'
                                )
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

          <VStack /* DESCRIPTION & LIKES */ w='100%'>
            <Stack /* DESCRIPTION */ w='100%' mb={1}>
              <Text fontSize='xs' textAlign='justify'>
                {' '}
                {comment?.description}
              </Text>
            </Stack>

            <Divider my={1} />
            <Stack alignItems='center'>
              {comment?.photo && comment?.photo !== 'none' && (
                <>
                  <Image source={{ uri: comment?.photo }} size={300} alt='post' />
                  <Divider opacity={0.5} />
                </>
              )}
            </Stack>

            <HStack /* LIKE BUTTON */ w='100%'
              py={0.5}
              pr={2}
              justifyContent='flex-end'
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
                <HStack space={1} alignItems='center'>
                  <Icon
                    as={MaterialIcons}
                    name='thumb-up'
                    color={isLiked ? COLORS.button.secundary : 'gray.400'}
                    size={4}
                  />
                  <Text fontSize='sm' color={'gray.400'}>
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
