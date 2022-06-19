import React, { useState, useCallback } from 'react'
import {
  AlertDialog,
  Button,
  Avatar,
  Badge,
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

import { parseDate, parseTime } from '../../utilities/Parsers'
import { previousFourteenHours } from '../../utils/functions'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'

import COLORS from '../styled-components/Colors'
import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById, getOnlyUser } from '../../services/user/userAPI'
import {
  deletePost,
  getHashtags,
  getUsertags,
} from '../../services/post/postAPI'
import { getComments } from '../../services/comments/commentPostAPI'
import {
  postReactionsByPost,
  getReactionsByPost,
} from '../../services/post/reactionAPI'
import { useFocusEffect } from '@react-navigation/native'
import Tag from './Tag'
import Hashtag from './Hashtag'

const Post = ({ navigation, post = {} }) => {
  const layout = useWindowDimensions()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    state: { user },
  } = useAuthContext()

  const [userLogged, setUserLogged] = useState(null)
  const [userPost, setUserPost] = useState(null)
  const [personTags, setPersonTags] = useState([])
  const [hashtags, setHashtags] = useState(null)

  const [isLiked, setIsLiked] = useState(false)
  const [postReactionInfo, setPostReactionInfo] = useState([])
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)

  const [deleteVisible, setDeleteVisible] = useState(false)

  const deletePostById = async () => {
    try {
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
          )
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
      getOnlyUser(user?.id)
        .then((res) => {
          setUserLogged(res?.Data)
        })
        .catch((error) => {
          console.log(error)
        })
      getUserById(post?.user)
        .then((res) => {
          setUserPost(res?.Data)
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

      getHashtags(post?._id)
        .then((res) => {
          setHashtags(res)
        })
        .catch((error) => {
          console.log(error)
        })

      getUsertags(post?._id)
        .then((res) => {
          setPersonTags(res)
        })
        .catch((error) => {
          console.log(error)
        })

      getComments(post?._id)
        .then((res) => {
          setComments(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
  )

  return (
    <Box
      w='100%'
      p={2}
      bgColor={COLORS.secundary}
      rounded='lg'
      shadow={1}
      mb={2}
    >
      <VStack>
        <HStack /* HEADER */ justifyContent='space-between' alignItems='center' w='95%'>
          <Stack /* AVATAR */ width='15%'>
            <TouchableOpacity
              onPress={() => {
                console.log(
                  `${userPost?.firstName + ' ' + userPost?.lastName}'s profile`
                )
                console.log(userPost._id)
                if (userPost?._id === user?.id) {
                  navigation.navigate('Profile')
                } else {
                  navigation.navigate('UserProfile', { user: userPost._id })
                }
              }}
            >
              <Avatar
                bg='purple.600'
                size='md'
                source={{
                  uri: userPost?.photo === 'none' ? null : userPost?.photo,
                }}
                borderColor='white'
                borderWidth={3}
              >
                {userPost && userPost?.firstName[0] + userPost?.lastName[0]}
              </Avatar>
            </TouchableOpacity>
          </Stack>

          <VStack ml={2} /* INFORMATION */ width='85%'>
            <HStack
              space={2}
              justifyContent='space-between'
              alignItems='center'
              h={7}
              mr={2}
              w={290}
              maxW={290}
            >
              <HStack space={2}>
                <Text bold fontSize='sm'>
                  {userPost?.firstName} {userPost?.lastName}
                </Text>
                <Text fontSize={10} color='#806e91' alignSelf='center'>
                  {parseDate(post?.createdAt) +
                    ' ' +
                    parseTime(post?.createdAt)}
                </Text>
              </HStack>

              {user?.id === post?.user &&
                previousFourteenHours(post?.createdAt) && (
                  <HStack alignItems='flex-end'>
                    <IconButton
                      icon={<FontAwesome name='edit' color='#806e91' />}
                      size='sm'
                      onPress={() => {
                        console.log(post?._id)
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
                          ¿Estás seguro de que quieres eliminar esta
                          publicación?
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

            <Divider opacity={0.5} />
            {personTags?.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {personTags?.map((tag, index) => (
                  <Tag key={index.toString()} tag={tag} navigation={navigation} />
                ))}
                <Divider mt={0.5} opacity={0.5} />
              </ScrollView>
            )}
          </VStack>
        </HStack>

        <VStack /* CONTENT */ width='100%'>
          <Stack w='95%' mx={2} my={2}>
            <Text fontSize='xs' textAlign='justify'>
              {post?.description}
            </Text>
          </Stack>
          <Divider opacity={0.5} />
          <Stack alignItems='center'>
            {post?.photo && post?.photo !== 'none' && (
              <>
                <Image source={{ uri: post?.photo }} size={400} alt='post' />
                <Divider opacity={0.5} />
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

          <HStack w='95%' mt={1} justifyContent='flex-end' space={4}>
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
                />
                <Text fontSize='xs' color={'gray.400'}>
                  {likes}
                </Text>
              </HStack>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommentPage', {
                  post: post,
                  comments: comments,
                })
              }}
            >
              <HStack space={1} alignItems='center'>
                <Icon
                  as={MaterialCommunityIcons}
                  name='comment'
                  color={'gray.400'}
                />
                <Text fontSize='xs' color={'gray.400'}>
                  {comments?.length || 0}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Post
