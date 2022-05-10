import React from 'react'
import { View } from 'react-native'
import {
  Input,
} from 'react-native-elements'

import { phoneValidator } from '../utils/functions'

import styles from './styled-components/styles'

const PhoneField = ({ name, value, setValues }) => {

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
          value.length === 0 || phoneValidator(value) ? null : 'Ingrese un número de teléfono válido'
        }
        errorStyle={{
          paddingTop: 10,
        }}
      />
    </View>
  )
}

export default PhoneField