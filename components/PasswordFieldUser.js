import React, { useState } from 'react'
import { View } from 'react-native'
import {
  Input,
  Icon,
  Button
} from 'react-native-elements'

import { passwordValidator } from '../utils/functions'

import styles from './styled-components/styles'

const PasswordField = ({ name, value, setValues, disable}) => {

  const [show, setShow] = useState(false)

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='#ccc'
        underlineColorAndroid={'transparent'}
        disabled={disable}
        autoCapitalize='none'
        secureTextEntry={show ? false : true}
        onChangeText={(text) => setValues(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}
        rightIcon={
          <Button
            icon={
              <Icon
                type='feather'
                name={show ? 'eye' : 'eye-off'}
                color='#25AADB'
              />
            }
            onPress={() => setShow(!show)}
            type='clear'
          />
        }
        errorMessage={
          value.length === 0 || passwordValidator(value) ? null : 'Ingrese una contraseña válida'
        }
        errorStyle={{
          paddingTop: 5,
        }}
      />
    </View>
  )
}

export default PasswordField