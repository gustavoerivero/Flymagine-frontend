import React, { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  View,
} from 'native-base'
import {
  Tab,
  TabView
} from '@rneui/themed'
import PostFeedProfile from './PostFeedProfile'
import COLORS from '../../styled-components/Colors'
import ReviewFeedProfile from './ReviewFeedProfile'
import FavFeedProfile from './FavFeedProfile'
import ToReadFeedProfile from './ToReadFeedProfile'
import ReadingFeedProfile from './ReadingFeedProfile'
import ReadFeedProfile from './ReadFeedProfile'

const TabContainerProfile = ({ navigation, userInfo }) => {
  const [index, setIndex] = useState(0)

  const layout = useWindowDimensions()

  const tabs = [
    'Publicaciones',
    'Reviews',
    'Favoritos',
    'Por leer',
    'Leyendo',
    'Leídos',
  ]

  return (
    <View minH={layout.height} >
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{ 
          backgroundColor: COLORS.primary, 
          height: 4, 
        }}
        scrollable
      >
        {tabs.map((tab) => (
          <Tab.Item
            key={tab}
            title={tab}
            titleStyle={{ color: COLORS.primary }}
            containerStyle={{ backgroundColor: 'white' }}
          />
        ))}        
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType='spring'
      >
        <TabView.Item>
          <PostFeedProfile 
            navigation={navigation}
            userInfo={userInfo}
          />
        </TabView.Item>
        <TabView.Item>
          <ReviewFeedProfile />
        </TabView.Item>
        <TabView.Item>
          <FavFeedProfile />
        </TabView.Item>
        <TabView.Item>
          <ToReadFeedProfile />
        </TabView.Item>
        <TabView.Item>
          <ReadingFeedProfile />
        </TabView.Item>
        <TabView.Item>
          <ReadFeedProfile />
        </TabView.Item>
      </TabView>
    </View>
  )
}

export default TabContainerProfile