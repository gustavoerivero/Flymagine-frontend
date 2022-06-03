import React from 'react'
import { View } from 'native-base'
import EditBookForm from '../../components/BookComponents/forms/EditBookForm'

const EditBook = ({ navigation, route }) => {

  return (
    <View>
      <EditBookForm
        navigation={navigation} bookData={ route?.params?.bookInfo }
      />
    </View>
  )
}

export default EditBook
