import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TopBar from './TopBar'

const Container = ({ children }) => {

  return (
    <ScrollView>
      <TopBar />
      <View
        style={styles.children}
      >
        <KeyboardAwareScrollView>
          {children}
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  children: {
    padding: 5,
    margin: 5,
    borderColor: 'rgba(134, 48, 197, .15)',
    borderRadius: 5,
    borderWidth: 1,
  }
})

export default Container