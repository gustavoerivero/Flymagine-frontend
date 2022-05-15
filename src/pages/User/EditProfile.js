import React from 'react'
import { View } from 'native-base'
import EditUserForm from '../../components/ProfileComponents/forms/EditUserForm'

const EditProfile = ({ navigation }) => {
  return (
    <View bgColor='white'>
      <EditUserForm navigation={navigation} />
    </View>
  )
}

export default EditProfile