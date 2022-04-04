import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import { Divider } from '@rneui/themed'

import styles from './styled-components/styles'
import { Button } from 'react-native-elements'

const Post = (props) => {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={{
          color: 'black',
        }}
      >
        <Button
          title={props.title}
          onPress={() => {
            console.log('Button pressed')
          }}
        />
      </Text>
      <Text
        style={styles.content}
      >
        {props.description}
      </Text>
      <Divider 
        color='black' 
        inset={true}
        width={1}
      />
    </View>
  )
}

export default Post
