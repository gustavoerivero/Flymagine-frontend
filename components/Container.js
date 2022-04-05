import React, {
  useState,
  useCallback
} from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TobBar from './TopBar'

const Container = ({ children }) => {

  const [key, setKey] = useState(0)
  const reload = useCallback(() => setKey((prevKey) => prevKey + 1), [])

  return (
    <View
      style={styles.container}
    >
      <TobBar
        reload={reload}
      />
      <View
        style={styles.children}
      >
        <KeyboardAwareScrollView>

          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F9F7F8',
  },
  children: {
    padding: 5,
    margin: 5,
    borderColor: 'rgba(134, 48, 197, .15)',
    borderRadius: 5,
    borderWidth: 1,
    height: '100%',
  }
})

export default Container