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

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ReaderUserProfile = () => {

  const [index, setIndex] = React.useState(0);

  const Navegation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', paddingBottom: 90}}>
        <Image
          source={Profile}
          style={styles.image}
          resizeMode='contain'
        />
        <Button
          title='Editar perfil'
          icon={{ name: 'settings', type: 'ionicon', borderWidth: 1, borderRadius: 200, size: 15 }}
          style={styles.button}
        />
      </View>
      <View style={styles.flex}>
        <Ionicons name="person" size={24} color="black" />
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 5 }}>
          Nombre del usuario
        </Text>
      </View>
      <View style={styles.flex}>
        <FontAwesome name="calendar" size={12} color="black" />
        <Text style={{marginLeft: 5}}>
          Fecha de nacimiento:
        </Text>
      </View>
      <View style={styles.flex}>
        <MaterialIcons name="description" size={12} color="black" />
        <Text style={{marginLeft: 5}}>
          Descripción del usuario
        </Text>
      </View>
      <Text
        style={styles.follow}
      >
        # Siguiendo                     # Seguido
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
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'star', type: 'ionicon', }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'heart', type: 'ionicon', }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'time', type: 'ionicon', }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'book', type: 'ionicon', }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'checkmark-done-sharp', type: 'ionicon', }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%' }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%', opacity: .90 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%', opacity: .80 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%', opacity: .70 }}>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%', opacity: .60 }}>
        </TabView.Item>
      </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '40%',
    height: '300%',
    borderBottomWidth: 1,
    marginRight: 100,
  },
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#9681DF',
    paddingTop: 40
  },
  itemContainer: {
    backgroundColor: 'rgba(235, 235, 255, .1)',
    alignSelf: 'center',
    borderWidth: .25,
    borderRadius: 2,
  },
  text: {
    fontSize: 12,
    color: 'black'
  },
  follow: {
    fontSize: 18,
    alignSelf: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 200,
  },
  flex: {
    flexDirection: 'row',
    paddingLeft: 5
  }
})

export default ReaderUserProfile