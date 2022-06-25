import React, { useCallback, useState } from 'react'
import { useWindowDimensions, TouchableOpacity, ImageBackground } from 'react-native'
import { ScrollView, Box, TextArea, Stack, Icon, HStack, VStack, Button } from 'native-base'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CommentModify from '../../components/Post/CommentModify'
import { handleChange, pickImage, permisionFunction } from '../../utils/functions'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { updateComment, postImage } from '../../services/comments/commentPostAPI'
import mime from 'mime'

import { commentSchema, commentDefaultValue } from '../../utils/formValidations/dataCommentValidation'

import COLORS from '../../components/styled-components/Colors'

const ModifyCommentPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [height, setHeight] = useState(20)

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [comment, setComment] = useState({
    _id: route.params.comment._id,
    post: route.params.comment.post,
    user: route.params.comment.user,
    description: route.params.comment.description,
    photo: route.params.comment.photo || 'none',
    createdAt: route.params.comment.createdAt,
    usersLiked: route.params.comment.usersLiked || [],
  })

  const [photo, setPhoto] = useState(null)

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
      permisionFunction()
    }, [])
  )

  const onSubmit = async (values) => {
    startLoading()
    try {

      updateComment(comment._id, values)
        .then((res) => {

          if (res && photo) {
  
            const imageUri =
              Platform.OS === 'ios'
                ? 'file:///' + photo.uri.split('file:/').join('')
                : photo.uri
  
            const formData = new FormData()
            formData.append('photo', {
              uri: imageUri,
              type: mime.getType(imageUri),
              name: imageUri.split('/').pop(),
            })
            
            postImage(comment._id, formData)
              .then((res) => {
                console.log(res)
              })
              .catch((error) => {
                console.log(error)
              })
            }
          
          setPhoto(null)
          reset(commentDefaultValue)
          showSuccessToast('¡Misión cumplida! El comentario ha sido modificado con éxtio')
          navigation.goBack()

        }).catch(error => {
          console.log(error)
          showErrorToast('¡Misión fallida! Ha ocurrido un error')
        })     

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
          <HStack
            justifyContent='space-between'
            h={57}
            px={1}
            pt={1}
            minW={layout.width}
            borderTopWidth={1}
            borderColor='gray.200'
            borderRadius={10}
          >
            <Stack justifyContent='flex-end' pb={2} pl={2}>
              {comment?.photo && comment?.photo !== 'none' && comment?.photo !== '' && (
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    _handleChange('photo', 'none')
                    setPhoto(null)
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: comment?.photo,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                    imageStyle={{
                      borderRadius: 5,
                    }}
                    alt='Photo'
                  >
                    <Icon
                      as={<MaterialIcons name='cancel' color='white' />}
                      size={4}
                      color='white'
                      alignSelf='flex-start'
                    />
                  </ImageBackground>
                </TouchableOpacity>
              )}
            </Stack>
            <HStack space={1} mr={2} alignItems='center' alignContent='center'>
              <Button
                leftIcon={
                  <Ionicons name='ios-image-outline' color='#fff' size={16} />
                }
                borderRadius='full'
                maxH={10} maxW={10}
                ml={1}
                colorScheme='indigo'
                onPress={() => {
                  let image = pickImage()
                  image
                    .then((res) => {
                      setPhoto(res)
                      _handleChange('photo', res.uri)
                      console.log(res)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }}
              />
            </HStack>
          </HStack>
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
                      isDisabled={comment === '' || !comment}
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

export default ModifyCommentPage