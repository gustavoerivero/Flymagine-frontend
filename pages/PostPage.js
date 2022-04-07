import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native'
import {
  Divider,
  Button,
  Image,
} from 'react-native-elements'

import { FAB } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons';

import CommentInput from '../components/Post/CommentInput'

import PostModify from '../components/Post/PostModify'

import {
  handleChange,
  pickImage,
  permisionFunction,
} from '../utils/functions'

import {
  parseDate,
  parseTime,
} from '../utilities/Parsers'

const CreatePostPage = () => {

  const [post, setPost] = useState({
    signId: '',
    author: 'Adam Meddler',
    avatar: 'https://randomuser.me/api/portraits/med/men/1.jpg',
    image: '',
    description: '',
    date: parseDate(new Date()) + ' ' + parseTime(new Date()),
    likes: 0,
    comments: [],
    tags: []
  })

  const _handleChange = (item, value) => handleChange(post, setPost, item, value)

  useEffect(() => {
    permisionFunction()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text 
          style={styles.headerText}          
        >
          Comparte tu experiencia
        </Text>
      </View>
      <View style={styles.container}>
        <PostModify
          signIn={post.signIn}
          author={post.author}
          avatar={post.avatar}
          image={post.image}
          description={post.description}
          date={post.date}
          likes={post.likes}
          comments={post.comments}
          tags={post.tags}
        />
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <View>
              {post.image !== "" && (
                <>
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
                </>

              )}
            </View>
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
                  _handleChange('image', res)
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
              }}
            />
          </View>
          <CommentInput
            text={post.description}
            setText={(text) => _handleChange('description', text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(90, 85, 220, 1)',
    
  },
  photoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 2.5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CreatePostPage