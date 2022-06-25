import React, { useState, useCallback } from 'react'
import {
  AlertDialog,
  Button,
  Avatar,
  Image,
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  ScrollView,
  Icon,
} from 'native-base'
import Hashtag from './Hashtag'
import Tag from './Tag'

import { parseDate, parseTime } from '../../utilities/Parsers'
import { before24hours } from '../../utils/functions'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import COLORS from '../styled-components/Colors'

import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import { getOnlyUser } from '../../services/user/userAPI'
import { deletePost } from '../../services/post/postAPI'
import {
  postReactionsByPost,
  getReactionsByPost,
} from '../../services/post/reactionAPI'
import { useFocusEffect } from '@react-navigation/native'
import useLoading from '../../hooks/useLoading'

const CommentPost = ({ navigation, post = {}, personTags = [], hashtags = [] }) => {

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    state: { user },
  } = useAuthContext()

  const { isLoading, startLoading, stopLoading } = useLoading()

  const [userLogged, setUserLogged] = useState(null)

  const [isLiked, setIsLiked] = useState(false)
  const [postReactionInfo, setPostReactionInfo] = useState([])
  const [likes, setLikes] = useState(0)

  const [deleteVisible, setDeleteVisible] = useState(false)

  const deletePostById = async () => {
    try {
      console.log(post)
      const data = await deletePost(post?._id)
      console.log(data)
      showSuccessToast('Publicación eliminada con éxito')
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async () => {
    try {
      const newValue = postReactionInfo
      if (newValue?.find((value) => userLogged._id === value?._id)) {
        newValue?.splice(
          newValue?.findIndex(
            (reactionUser) => userLogged?._id === reactionUser?._id
          ),
        )
      } else {
        newValue?.push(userLogged)
      }

      setPostReactionInfo(newValue)
      await postReactionsByPost(post?._id, postReactionInfo)
      setLikes(postReactionInfo?.length)
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      startLoading()
      try {

        getOnlyUser(user?.id)
          .then((res) => {
            setUserLogged(res?.Data)
          })
          .catch((error) => {
            console.log(error)
          })

        getReactionsByPost(post?._id)
          .then((res) => {
            setPostReactionInfo(res?.Data[0]?.users || [])
            setLikes(res?.Data[0]?.users?.length || 0)
            setIsLiked(
              res?.Data[0]?.users?.find((value) => user.id === value?._id)
            )
          })
          .catch((error) => {
            console.log(error)
          })

      } catch (error) {
        console.log(error)
      }
      stopLoading()

    }, [])
  )

  return (
    <Box p={2} bgColor={COLORS.secundary} rounded='lg' shadow={2} w='100%'>
      {isLoading ? (
        <Stack mt={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
          <ActivityIndicator size='large' color={COLORS.primary} />
        </Stack>
      ) : (
        <HStack>
          <Stack /* AVATAR */ w='15%' alignItems='center'>
            <TouchableOpacity
              onPress={() => {
                if (post?.user?._id === user?.id) {
                  navigation.navigate('Profile')
                } else {
                  navigation.navigate('UserProfile', { user: post?.user._id })
                }
              }}
            >
              <Avatar
                bg='purple.600'
                size='md'
                source={{
                  uri: post?.user?.photo === 'none' ? null : post?.user?.photo,
                }}
                borderColor='white'
                borderWidth={3}
              >
                {post?.user && post?.user?.firstName[0] + post?.user?.lastName[0]}
              </Avatar>
            </TouchableOpacity>
          </Stack>

          <VStack /* INFO */ px={1} w='85%'>
            <HStack
            /* USER & BUTTONS */ w='100%'
              h={8}
              space={2}
              justifyContent='space-between'
              alignItems='center'
            >
              <HStack /* NAME & DATE */ w='80%' space={2}>
                <Text bold fontSize='sm'>
                  {post?.user?.firstName} {post?.user?.lastName}
                </Text>
                <Text fontSize={10} color='#806e91' alignSelf='center'>
                  {parseDate(post?.createdAt) + ' ' + parseTime(post?.createdAt)}
                </Text>
              </HStack>

              {user?.id === post?.user?._id &&
                before24hours(post?.createdAt) && (
                  <HStack /* BUTTONS */ w='20%' alignItems='flex-end'>
                    <IconButton
                      icon={<FontAwesome name='edit' color='#806e91' />}
                      size='sm'
                      onPress={() => {
                        navigation.navigate('EditPost', {
                          post: post,
                          hashtags: hashtags,
                          personTags: personTags,
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
                          Eliminación de publicación
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                          ¿Estás seguro de que quieres eliminar esta publicación?
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
                                  deletePostById()
                                  setDeleteVisible(false)
                                  navigation?.navigate('Home')
                                } catch {
                                  showErrorToast(
                                    'Error eliminando la publicación'
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
              <Stack>
                <Divider my={1} />
                {personTags?.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {personTags?.map((tag, index) => (
                      <Tag key={index.toString()} tag={tag} navigation={navigation} />
                    ))}
                    <Divider mt={0.5} opacity={0.5} />
                  </ScrollView>
                )}
              </Stack>

              <Stack /* DESCRIPTION */ w='100%' mb={1}>
                <Text fontSize='xs' textAlign='justify'>
                  {post?.description}
                </Text>
              </Stack>

              <Divider my={1} />

              <Stack alignItems='flex-start'>
                {post?.photo && post?.photo !== 'none' && (
                  <>
                    <Image
                      source={{ uri: post?.photo }}
                      style={{ width: 300, height: 300 }}
                      alt='post'
                    />
                    <Divider my={1} />
                  </>
                )}
              </Stack>
              {hashtags?.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                  {hashtags?.map((hashtag, index) => (
                    <Hashtag key={index.toString()} hashtag={hashtag} navigation={navigation} />
                  ))}
                  <Divider mt={0.5} opacity={0.5} />
                </ScrollView>
              )}

              <HStack /* LIKE BUTTON */ w='100%' py={0.5} pr={2} justifyContent='flex-end' >
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
      )}
    </Box>
  )
}

export default CommentPost
