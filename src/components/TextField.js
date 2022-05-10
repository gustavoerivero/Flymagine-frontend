import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'

import styles from './styled-components/styles'

const TextField = ({ name, setText, multiline }) => {

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='rgba(50, 0, 105, .5)'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        onChangeText={(text) => setText(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}
        multiline={multiline}   
      />
    </View>
  )
}

export default TextField