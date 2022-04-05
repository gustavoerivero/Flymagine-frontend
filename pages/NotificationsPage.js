import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const NotificationsPage = () => {
  return (
    <View
      style={styles.container}
    >
      <KeyboardAwareScrollView>
        <Text>NotificationsPage</Text>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NotificationsPage