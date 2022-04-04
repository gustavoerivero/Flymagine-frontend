import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Image,
} from 'react-native-elements'

import FlymagineIcon from '../assets/favicon.png'

const TopBar = ({ reload }) => {
  return (
    <View
      style={styles.container}
    >
      <Button
        icon={
          <Image
            source={FlymagineIcon}
            style={styles.image}
          />
        }
        buttonStyle={styles.button}
        containerStyle={{
          borderRadius: 50,
        }}
        type='clear'
        onPress={reload}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 75,
    width: '100%',
    backgroundColor: 'rgba(134, 48, 197, 1)',
    borderBottomColor: 'rgba(134, 48, 197, .75)',
    borderBottomWidth: 1,
    shadowColor: 'rgba(134, 48, 197, .5)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
    marginBottom: 15,
  },
  image: {
    height: '100%',
    width: 55,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 50,
  }
})

export default TopBar
