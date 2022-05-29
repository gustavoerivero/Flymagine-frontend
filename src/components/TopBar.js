import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Image,
} from 'react-native-elements'
import useAuthContext from '../hooks/useAuthContext'

//Colors
import COLORS from './styled-components/Colors'

import FlymagineIcon from '../../assets/favicon.png'

const TopBar = () => {

  const { dispatch } = useAuthContext()

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
        onPress={() => {
          console.log('pressed')
          dispatch({ type: 'LOGOUT' })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    height: '8%',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    shadowColor: COLORS.gray5,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
  },
  image: {
    height: '95%',
    width: 50,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 50,
  }
})

export default TopBar
