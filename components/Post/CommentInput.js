import React, {
  useState
} from 'react'
import {
  View
} from 'react-native'
import {
  Input,
  Icon,
} from 'react-native-elements'

import { FAB } from '@rneui/themed'

import {
  FontAwesome,
} from '@expo/vector-icons'

const CommentInput = ({ text, setText, placeholder }) => {

  return (
    <View
      style={{
        minWidth: 400,
        minHeight: 40,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
      }}
    >
      <Input
        placeholder={placeholder || 'Dínos, ¿qué opinas?...'}
        leftIcon={{
          type: 'font-awesome',
          name: 'comment',
          color: '#aaa',
        }}
        leftIconContainerStyle={{
          marginRight: 10,
        }}
        inputContainerStyle={{
          borderBottomColor: 'transparent',
          backgroundColor: 'rgba(215, 215, 215, .10)',
          borderRadius: 5,
          paddingTop: 5,
          width: '100%',
        }}
        inputStyle={{
          color: '#000000',
          fontSize: 14,
        }}
        value={text || ''}
        onChangeText={setText}
        rightIconContainerStyle={{
          left: '10%',
        }}
        rightIcon={
          <FAB
            icon={
              <FontAwesome
                name='send'
                color='#fff'
                size={25}
                style={{
                  position: 'relative',
                  top: -2,
                  right: 3,
                }}
              />
            }
            color='rgba(134, 48, 197, 1)'
            onPress={() => {
              console.log(text)
              setText('')              
            }}
          />
        }
      />
    </View>
  )
}

export default CommentInput