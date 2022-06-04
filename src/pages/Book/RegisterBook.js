import React from 'react'
import { View } from 'native-base'
import BookRegisterForm from '../../components/BookComponents/forms/BookRegisterForm'

const RegisterBook = ({ navigation }) => {

  return (
    <View>
      <BookRegisterForm
        navigation={navigation}
      />
    </View>
  )
}

export default RegisterBook
