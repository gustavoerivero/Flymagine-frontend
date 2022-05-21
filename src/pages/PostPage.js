import React, { useCallback, useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import {
  ScrollView,
  View,
  Avatar,
  Text,
  Stack,
  VStack,
  HStack,
} from 'native-base'
import { Button, Image } from 'react-native-elements'
import { FAB } from '@rneui/themed'
import { AntDesign, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'

import CommentInput from '../components/Post/CommentInput'
import PostModify from '../components/Post/PostModify'
import COLORS from '../components/styled-components/Colors'

import {
  handleChange,
  pickImage,
  permisionFunction,
} from '../utils/functions'

import AddTag from '../components/Post/AddTag'
import { useFocusEffect } from '@react-navigation/native'
import useAuthContext from '../hooks/useAuthContext'
import { getUserById, searchUsers } from '../services/user/userAPI'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StyledField from '../components/StyledField'

const CreatePostPage = () => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState({
    author: `${userData?.firstName} ${userData?.lastName}` || '',
    avatar: userData?.photo || '',
    image: '',
    description: '',
    date: new Date(),
    hashtags: [],
    personTags: []
  })

  const [addPersonDialog, setAddPersonDialog] = useState(false)

  const [addTagDialog, setAddTagDialog] = useState(false)

  const [userSearch, setUserSearch] = useState('')
  const [usersSearched, setUserSearched] = useState([])
  const [hashtags, setTags] = useState([])

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
      <VStack h={layout.height * .94}>
        <VStack>
          <Stack bgColor='white' alignItems='center' py={3} pt={4}>
            <Text bold fontSize={20} color={COLORS.primary}>
              Comparte tu experiencia
            </Text>
          </Stack>
        </VStack>
        <ScrollView>
          <PostModify
            user={userData}
            post={post}
            handleChange={_handleChange}
          />
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
              {post?.image !== '' && (
                <Button
                  icon={
                    <Image
                      source={{
                        uri: post.image
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
                    console.log(`${post.author}'s post`)
                    _handleChange('image', '')
                  }}
                />
              )}
            </Stack>
            <HStack space={2}>

              <AddTag
                visible={addPersonDialog}
                setVisible={setAddPersonDialog}
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
                                return userData._id !== user._id && post.personTags.find(tag => tag._id === user._id) === undefined
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
                      {usersSearched.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setUserSearch('')
                            setUserSearched([])
                            setPost({
                              ...post,
                              personTags: [...post.personTags, item]
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
                    _handleChange('image', res.uri)
                    console.log(res)
                  }).catch(err => {
                    console.log(err)
                  })
                }}
              />
            </HStack>
          </HStack>

          <CommentInput
            value={post.description}
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
                onPress={() => {
                  console.log('Send')
                }}
              />
            }
          />
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default CreatePostPage