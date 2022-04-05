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

import {
  parseDate,
  parseTime,
} from '../../utilities/Parsers'

import {
  previousFourteenHours
} from '../../utils/functions'

const Comment = (data) => {

  const [props, setProps] = useState(data.props)
  const [signIn, setSignIn] = useState(data.signIn)

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(props.likes)

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Button
          buttonStyle={styles.profileButton}
          containerStyle={styles.profileButton}
          icon={
            <Image
              source={{
                uri: props.owner.picture
              }}
              style={styles.profileButton}
            />
          }
          type='clear'
          onPress={() => {
            console.log(`${props.owner.firstName + ' ' + props.owner.lastName}'s profile`)
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
              {props.owner.firstName + ' ' + props.owner.lastName}
            </Text>
            <Text style={{
              fontSize: 10,
              color: '#aaa',
            }}>
              {parseDate(props.publishDate) + ' ' + parseTime(props.publishDate)}
            </Text>
          </View>
          <View style={styles.titleButtons}>
            {(signIn === (props.owner.firstName + ' ' + props.owner.lastName) && previousFourteenHours(props.publishDate)) && (
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
                    console.log(`Edit post`)
                  }}
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
                    console.log(`Delete post`)
                  }}
                />
              </>
            )}
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.content}
          >
            {props.text}
          </Text>
        </View>
        <View>
          <Divider style={{
            marginRight: '20%',
          }} />
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
                console.log(`${props.owner.firstName + ' ' + props.owner.lastName}'s comment liked`)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Comment
