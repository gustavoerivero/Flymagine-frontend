import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import {
  Button, Icon, Tab, TabView
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'

import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons';


import stylesProfile from '../components/styled-components/stylesProfile'
import EditReaderUserProfile from './EditReaderUserProfile'
import ReaderUserProfile from './ReaderUserProfile'
import MyBook from './MyBook'
import MyFollower from './MyFollower'
import MyFollow from './MyFollow'

const WritterUserProfile = () => {

  const [index, setIndex] = React.useState(0);

  const Navegation = useNavigation()

  return (
    <View style={stylesProfile.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image
          source={Profile}
          style={stylesProfile.image}
          resizeMode='contain'
        />
        <Text
          style={styles.textRol}
          onPress={() => Navegation.navigate(ReaderUserProfile)}>
          Cambiar Rol
        </Text>
        <TouchableOpacity
          style={stylesProfile.button}
          activeOpacity={0.85}
        >
          <Ionicons name="ios-settings-sharp" size={15} color="white" />
          <Text
            style={styles.textButton}>
            Editar libro
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
        <Ionicons name="person" size={24} color="black" />
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}>
          "Nombre del usuario"
        </Text>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
        <FontAwesome name="calendar" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
          Fecha de nacimiento:
        </Text>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
        <MaterialIcons name="description" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
          biografía del usuario:
        </Text>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
        <Entypo name="book" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 5 }}>
          Géneros literarios favoritos:
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={styles.follow}
          onPress={() => Navegation.navigate(MyFollower)}
        >
          3  Siguiendo
        </Text>
        <Text style={styles.follow}
          onPress={() => Navegation.navigate(MyFollow)}
        >
          3  Seguidos
        </Text>
      </View>
      <TouchableOpacity
          style={styles.button2}
          activeOpacity={0.85}
          onPress={() => Navegation.navigate(MyBook)}
        >
          <Foundation name="book-bookmark" size={15} color="white" />
          <Text
            style={styles.textButton}>
            Mis Libros
          </Text>
        </TouchableOpacity>
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
          icon={{ name: 'star', type: 'ionicon', color: 'black' }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'heart', type: 'ionicon', color: 'black' }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'time', type: 'ionicon', color: 'black' }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'book', type: 'ionicon', color: 'black' }}
        />
        <Tab.Item
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={{ name: 'checkmark-done-sharp', type: 'ionicon', color: 'black' }}
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
    fontStyle: 'italic',
    marginBottom: 5,
  },
  button2: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    marginRight: 5,
    maxWidth: 120,
    maxHeight: 40,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  textRol: {
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
  },
  
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  }
})

export default WritterUserProfile