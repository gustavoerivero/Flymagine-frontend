import React, { useCallback, useState } from 'react'
import { ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  ScrollView,
  Avatar,
  Box,
  TextArea,
  Stack,
  Button,
  Icon,
  Text,
  VStack,
  HStack,
} from 'native-base'
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import mime from 'mime'

import PostModify from '../../components/Post/PostModify'
import { handleChange, pickImage, permisionFunction } from '../../utils/functions'
import AddTag from '../../components/Post/AddTag'
import StyledField from '../../components/StyledField'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  commentSchema,
  commentDefaultValue,
} from '../../utils/formValidations/dataCommentValidation'

import useAuthContext from '../../hooks/useAuthContext'
import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import { getUserById, searchUsers } from '../../services/user/userAPI'
import { searchHashtag, createHashtag } from '../../services/hashtag/hashtagAPI'
import {
  updatePost,
  postImage,
  setHashtags,
  setUsertags,
} from '../../services/post/postAPI'

import COLORS from '../../components/styled-components/Colors'

const PostEditPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

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

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [post, setPost] = useState({
    _id: route.params.post._id,
    user: route.params.post.user,
    author: `${post?.user?.firstName} ${post?.user?.lastName}` || '',
    avatar: post?.user?.photo || '',
    photo: route.params.post.photo,
    description: route.params.post.description,
    createdAt: route.params.post.createdAt,
    hashtags: route.params.hashtags || [],
    personTags: route.params.personTags || [],
  })

  const [height, setHeight] = useState(20)

  const [image, setImage] = useState(null)

  const [addPersonDialog, setAddPersonDialog] = useState(false)

  const [addTagDialog, setAddTagDialog] = useState(false)

  const [userSearch, setUserSearch] = useState('')
  const [usersSearched, setUserSearched] = useState([])

  const [tagSearch, setTagSearch] = useState('')
  const [tagsSearched, setTagsSearched] = useState([])

  const _handleChange = (item, value) => handleChange(post, setPost, item, value)

  useFocusEffect(
    useCallback(() => {
      permisionFunction()
    }, [])
  )

  const onSubmit = async () => {

    startLoading()

    try {

      const response = await updatePost(post._id, { description: post.description })

      console.log(response)

      let idPost = post._id

      if (image) {

        const imageUri = Platform.OS === 'ios' ? 'file:///' + image.uri.split('file:/').join('') : image.uri

        const formData = new FormData()
        formData.append('photo', {
          uri: imageUri,
          type: mime.getType(imageUri),
          name: imageUri.split('/').pop()
        })

        postImage(idPost, formData)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }

      setUsertags(idPost, post?.personTags)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      setHashtags(idPost, post?.hashtags)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      setPost({
        ...post,
        description: '',
        image: '',
        hashtags: [],
        personTags: []
      })
      setImage(null)

      showSuccessToast('¡Misión cumplida! Has editado una publicación')
      navigation.navigate('Home')


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
          <VStack
            maxH='65%' py={1} alignItems='center'
          >
            {post && (
              <PostModify
                post={post}
                handleChange={_handleChange}
              />
            )}
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
            <Stack justifyContent='flex-end' >
              {post?.photo && post?.photo !== 'none' && post?.photo !== '' && (
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    console.log(`${post.author}'s post`)
                    _handleChange('image', '')
                    setImage(null)
                    post.photo = ''
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: post.photo,
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                    }}
                    imageStyle={{
                      borderRadius: 5,
                    }}
                    alt={post.author}
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
            <HStack space={2}>

              <AddTag
                visible={addPersonDialog}
                setVisible={setAddPersonDialog}
                title='Incluye a un amigo'
              >
                <VStack space={1}>
                  <HStack space={2} justifyContent='center'>
                    <StyledField
                      placeholder='¿Quién está involucrado?'
                      value={userSearch}
                      onChangeText={(text) => {
                        setUserSearch(text)
                        if (text !== '') {
                          searchUsers(text)
                            .then(res => {

                              let filtered = res.Data.filter(user => {
                                return post?.user._id !== user._id && post?.personTags.find(tag => tag._id === user._id) === undefined
                              })

                              setUserSearched(filtered)

                            })
                            .catch(error => {
                              console.log(error)
                            })
                        } else {
                          setUserSearched([])
                        }
                      }}
                      w='85%'
                    />
                    <Button
                      leftIcon={
                        <MaterialIcons name='cancel' color='#fff' size={20} />
                      }
                      colorScheme='pink'
                      onPress={() => {
                        setAddPersonDialog(false)
                      }}
                    />
                  </HStack>
                  <ScrollView>
                    <VStack maxH='80%' space={2} mx='5%'>
                      {usersSearched.map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          onPress={() => {
                            setUserSearch('')
                            setUserSearched([])
                            setPost({
                              ...post,
                              personTags: [...post?.personTags, item]
                            })
                            setAddPersonDialog(false)
                            console.log(post)
                          }}
                        >
                          <HStack
                            space={2}
                            alignItems='center'
                          >
                            <Avatar
                              bg='purple.600'
                              size='xs'
                              source={{
                                uri: item?.photo === 'none' ?
                                  null
                                  : item?.photo
                              }}
                              borderColor='white'
                              borderWidth={3}
                            >
                              <Text bold color='white' fontSize={8}>
                                {item && (item?.firstName[0] + item?.lastName[0])}
                              </Text>
                            </Avatar>

                            <Text bold fontSize={12} color='gray.700'>
                              {item?.firstName} {item?.lastName}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      ))}
                    </VStack>
                  </ScrollView>
                </VStack>

              </AddTag>

              <Button
                leftIcon={<Ionicons name='ios-person-add' color='#fff' size={16} />}
                maxH={10} maxW={10}
                borderRadius='full'
                colorScheme='blue'
                onPress={() => {
                  console.log('Add person tag')
                  setAddPersonDialog(true)
                }}
              />

              <AddTag
                visible={addTagDialog}
                setVisible={setAddTagDialog}
                title='Etiqueta esta publicación'
              >
                <VStack space={1}>
                  <HStack space={2} justifyContent='center'>
                    <StyledField
                      placeholder='¿De qué se trata la publicación?'
                      value={tagSearch}
                      onChangeText={(text) => {
                        setTagSearch(text)
                        if (text !== '') {
                          searchHashtag(text)
                            .then(res => {

                              let filtered = res.filter(hashtag => {
                                return post?.hashtags.find(tag => tag._id === hashtag._id) === undefined
                              })

                              setTagsSearched(filtered)

                            })
                            .catch(error => {
                              console.log(error)
                            })
                        } else {
                          setTagsSearched([])
                        }
                      }}
                      w='70%'
                    />
                    <Button
                      leftIcon={
                        <MaterialCommunityIcons
                          name='tag-plus'
                          color='#fff'
                          size={20}
                        />
                      }
                      colorScheme='blue'
                      isDisabled={
                        tagSearch === '' ||
                        post.hashtags.find((tag) => tag.name === tagSearch) ||
                        tagsSearched.find((tag) => tag.name === tagSearch) ||
                        isLoading
                      }
                      onPress={() => {
                        startLoading()
                        createHashtag({
                          name: tagSearch,
                        })
                          .then((res) => {
                            setPost({
                              ...post,
                              hashtags: [...post.hashtags, res],
                            })

                            setTagSearch('')
                            setTagsSearched([])
                            setAddTagDialog(false)
                            showSuccessToast(
                              '¡Misión cumplida! Has creado una etiqueta'
                            )
                          })
                          .catch((error) => {
                            console.log(error)
                            showErrorToast(
                              '¡Misión fallida! No se ha podido crear la etiqueta'
                            )
                          })
                        stopLoading()
                      }}
                    />
                    <Button
                      leftIcon={
                        <MaterialIcons name='cancel' color='#fff' size={20} />
                      }
                      colorScheme='pink'
                      onPress={() => {
                        setAddTagDialog(false)
                      }}
                    />
                  </HStack>
                  <ScrollView>
                    <VStack maxH='80%' space={2} mx='5%'>
                      {tagsSearched.map((item) => (
                        <TouchableOpacity
                          key={item._id}
                          onPress={() => {
                            setTagSearch('')
                            setTagsSearched([])
                            setPost({
                              ...post,
                              hashtags: [...post?.hashtags, item]
                            })
                            setAddTagDialog(false)
                            console.log(post)
                          }}
                        >
                          <HStack
                            space={2}
                            alignItems='center'
                          >
                            <Icon
                              as={Ionicons}
                              name='pricetag'
                              size={3}
                              color='#aaa'
                            />
                            <Text bold fontSize={12} color='gray.700'>
                              {item?.name}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      ))}
                    </VStack>
                  </ScrollView>
                </VStack>

              </AddTag>

              <Button
                leftIcon={<AntDesign name='tags' color='#fff' size={15} />}
                borderRadius='full'
                maxH={10} maxW={10}
                colorScheme='pink'
                onPress={() => {
                  console.log('Add post tag')
                  setAddTagDialog(true)
                }}
              />

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
                      _handleChange('photo', res.uri)
                      setImage(res)
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
            render={({ field: { onChange, value = post.description, ...field } }) => (
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
                      value={post.description}
                      onChangeText={(text) => {
                        _handleChange('description', text)
                        onChange(text)
                      }}
                      placeholder='Cuentanos, ¿Qué hay de nuevo?'

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

export default PostEditPage