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

import AddTag from './AddTag'

import {
  parseDate,
  parseTime,
} from '../../utilities/Parsers'

import {
  Ionicons
} from '@expo/vector-icons'

const PostModify = (props) => {

  const [tags, setTags] = useState(props.personTags)

  const [addPersonTag, setAddPersonTag] = useState(null)
  const [addTag, setAddTag] = useState(null)

  const [dialogPersonTag, setDialogPersonTag] = useState(false)
  const [dialogTag, setDialogTag] = useState(false)

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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          {props.personTags.length > 0 && (
            <View
              style={{
                marginLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {tags?.map((tag, key) => (
                <Chip
                  key={key}
                  type='outlined'
                  avatar={
                    <Image
                      source={{
                        uri: tag.picture,
                      }}
                      style={{
                        height: 15,
                        width: 15,
                      }}
                    />
                  }
                  onPress={() => {
                    console.log(`${tag.firstName} ${tag.lastName}'s tag`)
                  }}
                  style={{
                    marginRight: 5,
                    height: 25,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(200, 90, 235, .5)',
                  }}
                  textStyle={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                  onClose={() => {
                    console.log(`Delete ${tag.firstName} ${tag.lastName}'s tag`)

                    props.setPosts(props.posts.map((post, id) => {
                      if (props.id === id) {
                        return {
                          ...post,
                          personTags: post.personTags.filter(tag => tag.id !== post.personTags[key].id)
                        }
                      }
                      return post
                    }))
                  }}

                >
                  {tag.firstName + ' ' + tag.lastName}
                </Chip>
              ))}
            </View>
          )}
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
                console.log(`Delete ${tag}'s tag`)

                props.setPosts(props.posts.map((post, id) => {
                  if (props.id === id) {
                    return {
                      ...post,
                      tags: post.tags.filter(tag => tag !== post.tags[index])
                    }
                  }
                  return post
                }))
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
