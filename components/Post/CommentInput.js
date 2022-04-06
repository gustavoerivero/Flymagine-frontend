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
  Entypo,
  FontAwesome,
  Ionicons
} from '@expo/vector-icons'

const CommentInput = () => {

  const [comment, setComment] = useState('')

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
      }}
    >
      <Input
        placeholder='Comentar...'
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
        }}
        inputStyle={{
          color: '#000000',
          fontSize: 14,
        }}
        value={comment}
        onChangeText={(text) => setComment(text)}
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
              console.log(comment)
              setComment('')
            }
            }
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          />
        }
      />
    </View>
  )
}

export default CommentInput