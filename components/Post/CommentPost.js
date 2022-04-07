import React, {
  useState,
} from 'react'
import {
  Text,
  View,
} from 'react-native'

import { Divider } from '@rneui/themed'

import styles from './styled-components/styles'
import { Button, Image } from 'react-native-elements'

import { Chip } from 'react-native-paper'

import Dialog from '../Dialog'

import {
  parseDate,
  parseTime,
} from '../../utilities/Parsers'

import {
  previousFourteenHours
} from '../../utils/functions'

const CommentPost = (data) => {

  const [props, setProps] = useState(data.props)

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(props.likes)

  const [editChoice, setEditChoice] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  const [deleteVisible, setDeleteVisible] = useState(false)
  const [deleteChocie, setDeleteChoice] = useState(false)

  return (
    <View style={[styles.container, {
      padding: 10,
      paddingTop: 45,
    }]}>
      <View style={styles.photoContainer}>
        <Button
          buttonStyle={styles.profileButton}
          containerStyle={styles.profileButton}
          icon={
            <Image
              source={{
                uri: props.avatar
              }}
              style={styles.profileButton}
            />
          }
          type='clear'
          onPress={() => {
            console.log(`${props.author}'s profile`)
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.title}>
            <Text style={{
              fontWeight: 'bold',
              marginRight: 5,
            }}>
              {props.author}
            </Text>
            <Text style={{
              fontSize: 10,
              color: '#aaa',
            }}>
              {parseDate(props.date) + ' ' + parseTime(props.date)}
            </Text>
          </View>
          <View style={styles.titleButtons}>
            {(props.signIn === props.author && previousFourteenHours(props.date)) && (
              <>
                <Button
                  containerStyle={styles.button}
                  icon={{
                    name: 'edit',
                    type: 'font-awesome',
                    color: '#aaa',
                    size: 15,
                  }}
                  type='clear'
                  onPress={() => {
                    console.log(`Edit ${props.author}'s post`)
                    setEditVisible(true)
                  }}
                />
                <Dialog
                  content='¿Está seguro de querer editar esta publicación?'
                  visible={editVisible}
                  setVisible={setEditVisible}
                  setChoice={setEditChoice}
                  cancelButton={true}
                  toNavigate='CreatePostPage'
                  params={props}
                />
                <Button
                  containerStyle={styles.button}
                  icon={{
                    name: 'trash',
                    type: 'font-awesome',
                    color: '#aaa',
                    size: 15,
                  }}
                  type='clear'
                  onPress={() => {
                    console.log(`Delete ${props.author}'s post`)
                    setDeleteVisible(true)
                  }}
                />
                <Dialog
                  content='¿Está seguro de querer eliminar esta publicación?'
                  visible={deleteVisible}
                  setVisible={setDeleteVisible}
                  setChoice={setDeleteChoice}
                  cancelButton={true}
                />
              </>
            )}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.content}
          >
            {props.description}
          </Text>
        </View>
        <View>
          {props.image !== "" && (
            <Image
              source={{
                uri: props.image
              }}
              style={styles.image}
            />
          )}
        </View>
        <View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {props.tags.map((tag, index) => (
              <Chip
                key={index}
                style={{
                  margin: 2,
                }}
                onPress={() => {
                  console.log(`Tag ${tag}`)
                }}
              >
                {tag}
              </Chip>
            ))}
          </View>
          <Divider />
          <View style={styles.actionsContainer}>
            <Button
              containerStyle={{
                borderRadius: 50,
              }}
              buttonStyle={{
                backgroundColor: '#fff',
                borderRadius: 5,
                height: 30,
                width: 50,
              }}
              icon={{
                name: 'thumb-up',
                type: 'material-community',
                color: isLiked ? 'purple' : '#aaa',
                size: 15,
              }}
              title={likes}
              titleStyle={{
                fontSize: 10,
                color: isLiked ? 'purple' : '#aaa',
              }}
              onPress={() => {
                setIsLiked(!isLiked)
                setLikes(isLiked ? likes - 1 : likes + 1)
                console.log(`${props.author}'s post liked`)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default CommentPost
