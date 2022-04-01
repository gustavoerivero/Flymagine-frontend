import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Input,
  Icon,
  Button
} from 'react-native-elements'

import PasswordValidator from '../utilities/PasswordValidator'

const PasswordField = ({ name, setValue, value }) => {

  const [show, setShow] = useState(false)

  return (
      <View style={styles.item}>
        <Input
          placeholder={name}
          placeholderTextColor='#ccc'
          underlineColorAndroid={'transparent'}
          autoCapitalize='none'
          secureTextEntry={show ? false : true}
          onChange={(e) => setValue(e)}
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
          /*
          errorMessage={
            PasswordValidator(value) ? '' : 'La contraseña ingresada no es válida.'
          }
          errorStyle={{
            paddingTop: 5,
          }}    
          */      
        />
      </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(40, 10, 57, .75)',
    margin: 8,
    padding: 8,
    width: '95%'
  },
  input: {
    height: 50,
  },
  label: {
    color: 'white'
  }
})

export default PasswordField