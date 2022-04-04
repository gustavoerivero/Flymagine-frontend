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

const TopBar = () => {
  return (
    <View
      style={styles.container}
    >
      <Button 
        icon={
          <Image 
            source={FlymagineIcon} 
            style={{
              width: 55, 
              height: 55,
            }}
          />
        }
        buttonStyle={{
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 50,
        }}
        containerStyle={{
          borderRadius: 50,
        }}
        type='clear'
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
    backgroundColor: 'purple',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 10,
  },
})

export default TopBar
