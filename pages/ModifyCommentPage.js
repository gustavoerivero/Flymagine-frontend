import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  Divider,
  Button,
  Image,
} from 'react-native-elements'

import { FAB } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons';

import CommentInput from '../components/Post/CommentInput'

import {
  handleChange,
  pickImage,
  permisionFunction,
} from '../utils/functions'

import CommentModify from '../components/Post/CommentModify';

const ModifyCommentPage = ({ route }) => {

  const [comment, setComment] = useState(route.params.props || {
    id: '',
    text: '',
    publishDate: '',
    likes: '',
    owner: {
      id: '',
      title: '',
      firstName: '',
      lastName: '',
      picture: '',
    }
  })

  const _handleChange = (item, value) => handleChange(comment, setComment, item, value)

  useEffect(() => {
    permisionFunction()
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <CommentModify
          author={comment.owner.firstName + ' ' + comment.owner.lastName}
          avatar={comment.owner.picture}
          description={comment.text}
          date={comment.publishDate}
          likes={comment.likes}
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
          <CommentInput
            text={comment.text}
            setText={(text) => _handleChange('text', text)}
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

export default ModifyCommentPage