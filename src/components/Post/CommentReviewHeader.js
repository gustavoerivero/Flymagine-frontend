import React, { useState, useCallback } from 'react'
import { AirbnbRating } from 'react-native-elements'
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
import { deleteReview } from '../../services/post/reviewAPI'
import { postReactionsByReview, getReactionsByReview } from '../../services/post/reactionAPI'
import { useFocusEffect } from '@react-navigation/native'

const CommentReviewHeader = ({ navigation, post: review = {} }) => {

  const layout = useWindowDimensions()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const {
    state: { user }
  } = useAuthContext()

  const [userLogged, setUserLogged] = useState(null)
  const [userReview, setUserReview] = useState(null)

  const [isLiked, setIsLiked] = useState(false)
  const [reviewReactionInfo, setReviewReactionInfo] = useState([])
  const [likes, setLikes] = useState(0)

  const [deleteVisible, setDeleteVisible] = useState(false)

  const deleteReviewById = async () => {
    try {
      console.log(review)
      const data = await deleteReview(review?._id)
      console.log(data)
      showSuccessToast('¡Misión cumplida! La review fue eliminada con éxito')
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async () => {
    try {
      const newValue = reviewReactionInfo
      if (newValue?.find((value) => userLogged._id === value?._id)) {
        newValue?.splice(newValue?.findIndex((reactionUser) => userLogged?._id === reactionUser?._id), 1)
      } else {
        newValue?.push(userLogged)
      }

      setReviewReactionInfo(newValue)
      await postReactionsByReview(review?._id, reviewReactionInfo)
      setLikes(reviewReactionInfo?.length)

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
      getUserById(review?.idUser)
        .then(res => {
          setUserReview(res?.Data)
        })
        .catch(error => {
          console.log(error)
        })
      getReactionsByReview(review?._id)
        .then(res => {
          setReviewReactionInfo(res?.Data[0]?.users || [])
          setLikes(res?.Data[0]?.users?.length || 0)
          setIsLiked(res?.Data[0]?.users?.find((value) => user.id === value?._id))
        })
        .catch(error => {
          console.log(error)
        })

    }, [])
  )

  return (
    <Box
      p={2}
      bgColor='white'
      rounded='lg'
      shadow={2}
      pb={2}
      w='100%'
    >
      <HStack>
        <TouchableOpacity
          onPress={() => {
            console.log(`${userReview?.firstName + ' ' + userReview?.lastName}'s profile`)
            console.log(userReview._id)
            if (userReview?._id === user?.id) {
              navigation.navigate('Profile')
            } else {
              navigation.navigate('UserProfile', { user: userReview._id })
            }
          }}
        >
          <Avatar
            bg='purple.600'
            size='md'
            source={{
              uri: (userReview?.photo === 'none' ? null : userReview?.photo)
            }}
            borderColor='white'
            borderWidth={3}
          >
            {userReview && (userReview?.firstName[0] + userReview?.lastName[0])}
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
                {userReview?.firstName} {userReview?.lastName}
              </Text>
              <Text
                fontSize={10}
                color='gray.300'
                alignSelf='center'
              >
                {parseDate(review?.createdAt) + ' ' + parseTime(review?.createdAt)}
              </Text>
            </HStack>

            {(user?.id === review?.idUser && previousFourteenHours(review?.createdAt)) && (
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
                    console.log(review?._id)
                    navigation.navigate('EditPost', { 
                      post: review,
                      hashtags: hashtags,
                      personTags: personTags
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
                      Eliminación de review
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      ¿Estás seguro de que quieres eliminar esta review?
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
                              deleteReviewById()
                              setDeleteVisible(false)
                              navigation?.navigate('Home')
                            } catch {
                              showErrorToast('¡Misión fallida! No se pudo eliminar la review')
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
                {review?.description}
              </Text>
            </Stack>
            <Stack w={layout.width * 0.73} mx={2} mb={3} alignItems='flex-start'>
              <AirbnbRating
                count={5}
                showRating={false}
                size={10}
                defaultRating={review?.rating}
                isDisabled={true}
                selectedColor={'#FF00F0'}
                unSelectedColor={COLORS.button.secundaryDisabled}
              />
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

export default CommentReviewHeader
