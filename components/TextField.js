import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'

const TextField = ({ name, setText }) => {

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='#ccc'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        onChangeText={(text) =>setText(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}     
      />
    </View>
  )
}

export default TextField