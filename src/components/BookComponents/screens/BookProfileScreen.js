import React, { useState, useEffect } from 'react'
import { View } from 'native-base'

import { getUserById } from '../../../services/user/userAPI'
import TabContainerBookProfile from '../Components/TabContainerBookProfile'

const BookProfileScreen = ({navigation, bookData}) => {

  return (
    <View>
      <TabContainerBookProfile navigation={navigation} bookData={`627420031a320782986aaa3c`}/>
    </View>
  )
}

export default BookProfileScreen