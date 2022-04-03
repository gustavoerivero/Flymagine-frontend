import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Input
} from 'react-native-elements'

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

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,.75)',
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 50,
  },
  label: {
    color: 'white'
  }
})

export default TextField