import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SearchPage = () => {
  return (
    <View
      style={styles.container}
    >
      <KeyboardAwareScrollView>
        <Text>SearchPage</Text>
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

export default SearchPage