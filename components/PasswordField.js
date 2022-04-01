import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Input
} from 'react-native-elements'

const PasswordField = ({ name, setValue }) => {

  return (
    <View style={styles.item}>
      <Input
        placeholder={name}
        placeholderTextColor='#ccc'
        underlineColorAndroid={'transparent'}
        autoCapitalize='none'
        secureTextEntry={true}
        onChange={(e) => setValue(e)}
        containerStyle={styles.input}
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
    backgroundColor: 'transparent',
    margin: 8,
    padding: 8,
    width: '95%'
  },
  input: {
    height: 35,
  }
})

export default PasswordField