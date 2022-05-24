import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  View,
} from 'native-base'
import {
  Tab,
  TabView
} from '@rneui/themed'
import COLORS from '../styled-components/Colors'

import UserResults from './screens/UserResults'

const TabContainerSearch = ({ navigation, search }) => {

  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions()

  const tabs = [
    'Todo',
    'Usuarios',
    'Libros',
    'Publicaciones'
  ]

  return (
    <View minH={layout.height} >
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 4,
        }}
        scrollable
      >
        {tabs.map((tab) => (
          <Tab.Item
            key={tab}
            title={tab}
            titleStyle={{ color: 'white' }}
            containerStyle={{ backgroundColor: COLORS.primary }}
          />
        ))}
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType='spring'
      >
        <TabView.Item>
          
        </TabView.Item>
        <TabView.Item>
          <UserResults navigation={navigation} search={search} />
        </TabView.Item>
        <TabView.Item>

        </TabView.Item>
        <TabView.Item>

        </TabView.Item>
      </TabView>
    </View>
  )
}

export default TabContainerSearch