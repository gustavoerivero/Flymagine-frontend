import React from 'react'

import {
  StyleSheet,
} from 'react-native'

import {
  Input as InputRN,
} from 'react-native-elements'

const Input = ({ placeHolder, text, setText }) => {

  return (
    <>
      <InputRN
        placeholder={placeHolder}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        value={text}
        onChangeText={value => setText(value)}
      />
    </>
  )

}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'rgba(215, 215, 215, .10)',
    borderRadius: 5,
    width: '100%',
    marginTop: '10%',
  },
  inputStyle: {
    color: '#000000',
    fontSize: 14,
  },
})

export default Input