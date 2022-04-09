import React from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'

import EmailValidator from '../../utilities/EmailValidator'

import styles from './styled-components/login-styles'

const EmailField = ({ name, value, setValues, setIsValid }) => {

  const valid = () => {
    if (EmailValidator(value)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    console.log(EmailValidator(value))
  }

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='#ccc'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        onChangeText={(text) => {          
          valid()
          setValues(text)
        }}
        containerStyle={styles.input}
        inputStyle={styles.label}       
        errorMessage={
          value.length === 0 || EmailValidator(value) ? null : 'Ingrese un correo electrónico válido'
        }
        errorStyle={{
          paddingTop: 12,
        }}             
      />
    </View>
  )
}

export default EmailField