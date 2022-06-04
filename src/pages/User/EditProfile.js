import React from 'react'
import { View } from 'native-base'
import EditUserForm from '../../components/ProfileComponents/forms/EditUserForm'
import COLORS from '../../components/styled-components/Colors'

const EditProfile = ({ navigation }) => {
  return (
    <View bgColor={COLORS.base}>
      <EditUserForm navigation={navigation} />
    </View>
  )
}

export default EditProfile