import React from 'react'
import { View } from 'native-base'

import TabContainerBookProfile from '../Components/TabContainerBookProfile'

const BookProfileScreen = ({navigation, bookData}) => {

  return (
    <View>
      <TabContainerBookProfile navigation={navigation} bookData={bookData}/>
    </View>
  )
}

export default BookProfileScreen