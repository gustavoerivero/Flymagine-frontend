import React, {
  useState
} from 'react'
import {
  View
} from 'react-native'
import {
  Input,
  Button
} from 'react-native-elements'

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
        
      }}
    >
      <Input
        placeholder='Añade un comentario...'
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
          borderRadius: 50,
        }}
        inputStyle={{
          color: '#000000',
          fontSize: 14,
        }}
        onChangeText={(text) => setComment(text)}
        rightIcon={
          <Button 
            title='Enviar'
            onPress={() => {
              console.log('Comment sent...')
            }}
          />
        }
      />
    </View>
  )
}

export default CommentInput