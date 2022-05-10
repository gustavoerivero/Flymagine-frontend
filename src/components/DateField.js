import React, { useState } from 'react'
import { View } from 'react-native'
import {
  Button,
  Input,
} from 'react-native-elements'

import styles from './styled-components/styles'

import DateDialog from './DateDialog'

const DateField = ({ name, value, setValues }) => {

  const [show, setShow] = useState(false)

  return (
    <View style={styles.item}>
      <DateDialog
        visible={show}
        setVisible={setShow}
        values={value}
        setValues={setValues}
      />
      <Input
        placeholder={name}
        placeholderTextColor='rgba(50, 0, 105, .5)'
        underlineColorAndroid={'transparent'}
        value={value}
        autoCapitalize='none'
        onChangeText={(text) => setValues(text)}
        containerStyle={styles.input}
        inputStyle={styles.label}
        rightIcon={
          <Button
            type='clear'
            icon={{
              name: 'calendar',
              type: 'font-awesome',
              size: 20,
              color: 'rgba(50, 0, 105, .5)',
            }}
            onPress={() => setShow(true)}
          />
        }
      />
    </View>
  )
}

export default DateField