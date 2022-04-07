import React, {
  useState,
} from 'react'
import {
  Text,
  View,
} from 'react-native'

import { Divider } from '@rneui/themed'

import { Chip } from 'react-native-paper'

import styles from './styled-components/styles'
import { Button, Image } from 'react-native-elements'

import {
  parseDate,
  parseTime,
} from '../../utilities/Parsers'

import {
  Ionicons
} from '@expo/vector-icons'

const PostModify = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Button
          buttonStyle={styles.profileButton}
          containerStyle={styles.profileButton}
          icon={
            ((props.avatar || props.avatar === "") &&
              <Image
                source={{
                  uri: props.avatar
                }}
                style={styles.profileButton}
              />
            ) ||
            <Ionicons
              name='ios-person'
              color='#000'
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
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.content}
          >
            {props.description}
          </Text>
        </View>
        <View>
          {props.image !== "" && props.image && (
            <Image
              source={{
                uri: props.image
              }}
              style={styles.image}
            />
          )}
        </View>
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
                  console.log(`Pressed Tag ${tag}`)
                }}
                onClose={() => {
                  console.log(`Close Tag ${tag}`)
                }}
              >
                {tag}
              </Chip>                
            ))}
          </View>
      </View>
      <Divider />
      <Divider
        color='black'
        inset={true}
        width={1}
      />
    </View>
  )
}

export default PostModify
