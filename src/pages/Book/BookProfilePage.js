import React from 'react'
import { View } from 'native-base'
import BookProfileScreen from '../../components/BookComponents/screens/BookProfileScreen'

const BookProfilePage = ({ navigation, route }) => {
  return (
    <View>
      <BookProfileScreen navigation={navigation} bookData={route?.params?.book} />
    </View>
  )
}

export default BookProfilePage