import React, { useCallback, useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  ScrollView,
  Avatar,
  Icon,
  Text,
  Stack,
  VStack,
  HStack,
} from 'native-base'
import { Button, Image } from 'react-native-elements'
import { FAB } from '@rneui/themed'
import { AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import mime from 'mime'

import CommentInput from '../../components/Post/CommentInput'
import PostModify from '../../components/Post/PostModify'
import {
  handleChange,
  pickImage,
  permisionFunction,
} from '../../utils/functions'
import AddTag from '../../components/Post/AddTag'
import StyledField from '../../components/StyledField'

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

const PostEditPage = ({ navigation, route }) => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState({
    _id: route.params.post._id,
    user: route.params.post.user,
    author: `${userData?.firstName} ${userData?.lastName}` || '',
    avatar: userData?.photo || '',
    photo: route.params.post.photo,
    description: route.params.post.description,
    createdAt: route.params.post.createdAt,
    hashtags: route.params.hashtags || [],
    personTags: route.params.personTags || [],
  })

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
      <VStack h={layout.height * .93}>
        <ScrollView>
          <VStack
            maxH='65%' py={1} alignItems='center'
          >
            {post && (
              <PostModify
                user={userData}
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
                <Button
                  icon={
                    <Image
                      source={{
                        uri: post?.photo
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                      }}
                    />
                  }
                  type='clear'
                  containerStyle={{
                    height: 45,
                    width: 45,
                    margin: 5,
                    marginLeft: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    console.log(`${post?.user}'s post`)
                    _handleChange('photo', 'none')
                  }}
                />
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
                                return userData._id !== user._id && post?.personTags.find(tag => tag._id === user._id) === undefined
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
                      icon={
                        <MaterialIcons
                          name='cancel'
                          color='#fff'
                          size={20}
                        />
                      }
                      buttonStyle={{
                        backgroundColor: 'rgba(255, 84, 138, 1)',
                      }}
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

              <FAB
                icon={
                  <Ionicons
                    name='ios-person-add'
                    color='#fff'
                    size={20}
                  />
                }
                containerStyle={{
                  position: 'relative',
                  marginBottom: 5,
                  right: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                }}
                color='rgba(200, 123, 255, 1)'
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
                      icon={
                        <MaterialCommunityIcons
                          name='tag-plus'
                          color='#fff'
                          size={20}
                        />
                      }
                      buttonStyle={{
                        backgroundColor: 'rgba(158, 84, 255, 1)',
                      }}
                      disabled={
                        tagSearch === '' ||
                        post?.hashtags.find(tag => tag.name === tagSearch) ||
                        tagsSearched.find(tag => tag.name === tagSearch) ||
                        isLoading
                      }
                      onPress={() => {
                        startLoading()
                        createHashtag({
                          name: tagSearch
                        })
                          .then(res => {
                            setPost({
                              ...post,
                              hashtags: [...post?.hashtags, res]
                            })

                            setTagSearch('')
                            setTagsSearched([])
                            setAddTagDialog(false)
                            showSuccessToast('¡Misión cumplida! Has creado una etiqueta')

                          })
                          .catch(error => {
                            console.log(error)
                            showErrorToast('¡Misión fallida! No se ha podido crear la etiqueta')
                          })
                        stopLoading()
                      }}
                    />
                    <Button
                      icon={
                        <MaterialIcons
                          name='cancel'
                          color='#fff'
                          size={20}
                        />
                      }
                      buttonStyle={{
                        backgroundColor: 'rgba(255, 84, 138, 1)',
                      }}
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

              <FAB
                icon={
                  <AntDesign
                    name='tags'
                    color='#fff'
                    size={20}
                  />
                }
                containerStyle={{
                  position: 'relative',
                  marginBottom: 5,
                  right: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                }}
                color='rgba(90, 123, 255, 1)'
                onPress={() => {
                  console.log('Add post tag')
                  setAddTagDialog(true)
                }}
              />

              <FAB
                icon={
                  <Ionicons
                    name='ios-image-outline'
                    color='#fff'
                    size={20}
                  />
                }
                containerStyle={{
                  position: 'relative',
                  marginBottom: 5,
                  right: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                }}
                color='rgba(90, 85, 220, 1)'
                onPress={() => {
                  let image = pickImage()
                  image.then(res => {
                    _handleChange('photo', res.uri)
                    setImage(res)
                    console.log(res)
                  }).catch(err => {
                    console.log(err)
                  })
                }}
              />
            </HStack>
          </HStack>

          <CommentInput
            value={post?.description}
            onChangeText={(text) => _handleChange('description', text)}
            placeholder='Dinos, ¿qué opinas?...'
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
                disabled={post?.description === '' || isLoading}
                onPress={() => {
                  startLoading()

                  updatePost(post._id, { description: post.description })
                    .then(res => {
                      console.log(res)

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
                    })
                    .catch(error => {
                      console.log(error)
                      showErrorToast('¡Misión fallida! No se ha podido editar la publicación')
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

export default PostEditPage