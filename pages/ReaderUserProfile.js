import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

import {
  Button, CheckBox, Icon, Tab, TabView
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'
import { BackgroundImage } from '@rneui/base'

const ReaderUserProfile = () => {

  const [index, setIndex] = React.useState(0);

  const Navegation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={Profile}
        style={styles.image}
        resizeMode='contain'
      />
      <Text>
        Nombre del usuario
      </Text>
      <Text>
        Fecha de nacimiento
      </Text>
      <Text>
        Descripción del usuario
      </Text>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'black',
          height: 3,
        }}
      >
        <Tab.Item
          title="Principal"
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
        />
        <Tab.Item
          title="Favoritos"
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
        />
        <Tab.Item
          title="Por Leer"
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
        />
        <Tab.Item
          title="Leyendo"
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
        />
        <Tab.Item
          title="Leídos"
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#9681DF', width: '100%' }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#9681DF', width: '100%', opacity: .80 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#9681DF', width: '100%', opacity: .60 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#9681DF', width: '100%', opacity: .40 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#9681DF', width: '100%', opacity: .20 }}>
        </TabView.Item>
      </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '20%',
    height: '20%',
    marginBottom: 25
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '50%',
    backgroundColor: '#9681DF',
  },
  itemContainer: {
    backgroundColor: '#9681DF',
    
  },
  text: {
    fontSize: 12,
    color: 'black'
  }
})

export default ReaderUserProfile