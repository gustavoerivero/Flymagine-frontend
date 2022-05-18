import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  ScrollView,
  Text,
  Stack,
  VStack,
  HStack,
} from 'native-base'
import {
  Button,
  Image,
} from 'react-native-elements'
import { FAB } from '@rneui/themed'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'

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
import { getUserById } from '../services/user/userAPI'

const CreatePostPage = () => {

  const layout = useWindowDimensions()

  const {
    state: { user },
  } = useAuthContext()

  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState({
    signIn: '',
    author: 'Adam Meddler',
    avatar: 'none',
    image: '',
    description: '',
    date: new Date(),
    likes: 0,
    comments: [],
    tags: [],
    personTags: []
  })

  const [addPersonDialog, setAddPersonDialog] = useState(false)
  const [addPersonChoice, setAddPersonChoice] = useState(false)

  const [addTagDialog, setAddTagDialog] = useState(false)
  const [addTagChoice, setAddTagChoice] = useState(false)

  const [personTags, setPersonTags] = useState(post.personTags || [])
  const [tags, setTags] = useState(post.tags || [])

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
    <ScrollView>
      <VStack>
        <VStack minH={layout.height * .25} >
          <Stack bgColor='white' alignItems='center' py={3} pt={4}>
            <Text bold fontSize={20} color={COLORS.primary}>
              Comparte tu experiencia
            </Text>
          </Stack>
          <PostModify
            user={userData}
            post={post}
          />
        </VStack>

        <VStack minH={layout.height * .68} justifyContent='flex-end'>
          <HStack
            justifyContent='space-between'
            px={1} 
            pt={3} 
            minW={layout.width}
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
            <VStack>

              <AddTag 
                visible={addPersonDialog}
                setVisible={setAddPersonDialog}
                setChoice={setAddPersonChoice}
                content='¿A quién quieres etiquetar?'
                
              />

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
                  console.log('Upload image')
                  let image = pickImage()
                  image.then(res => {
                    _handleChange('image', res.uri)
                    console.log(res)
                  }).catch(err => {
                    console.log(err)
                  })
                }}
              />
            </VStack>
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
    </ScrollView>
  )
}

export default CreatePostPage