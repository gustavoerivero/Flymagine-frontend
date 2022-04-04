import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TobBar from '../components/TopBar'

const HomeView = () => {
  return (
    <View
      style={styles.container}
    >
      <KeyboardAwareScrollView>
        <TobBar />
        <Text>HomeView</Text>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default HomeView