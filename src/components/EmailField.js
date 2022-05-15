import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'

import { emailValidator } from '../utils/functions'

import styles from './styled-components/styles'

const EmailField = ({ name, value, setValues }) => {

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='rgba(50, 0, 105, .5)'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        onChangeText={(text) => setValues(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}       
        errorMessage={
          value.length === 0 || emailValidator(value) ? null  : 'Ingrese un correo electrónico válido'
        }
        errorStyle={{
          paddingTop: 12,
        }}             
      />
    </View>
  )
}

export default EmailField