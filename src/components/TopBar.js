import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Image,
} from 'react-native-elements'

//Colors
import COLORS from './styled-components/Colors'

import FlymagineIcon from '../../assets/favicon.png'

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
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    shadowColor: COLORS.gray5,
    shadowOpacity: 0.75,
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
