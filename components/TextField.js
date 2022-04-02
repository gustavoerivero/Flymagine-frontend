import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Input
} from 'react-native-elements'

import styles from './styled-components/styles'

const TextField = ({ name, setValue }) => {

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='#ccc'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        onChangeText={(text) => setValue(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}     
      />
    </View>
  )
}

export default TextField