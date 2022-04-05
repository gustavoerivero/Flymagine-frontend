import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'

import {
  Button, Icon, Tab, TabView
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import stylesReaderUserProfile from '../components/styled-components/stylesReaderUserProfile'
import EditReaderUserProfile from './EditReaderUserProfile'

const ReaderUserProfile = () => {

  const [index, setIndex] = React.useState(0);

  const Navegation = useNavigation()

  return (
    <View style={stylesReaderUserProfile.container}>
      <View style={{ flexDirection: 'row', paddingBottom: 50, paddingTop: 30, 
                      alignItems: 'center', justifyContent: 'space-between' }}>
        <Image
          source={Profile}
          style={styles.image}
          resizeMode='contain'
        />
        <Button
          title='Editar perfil'
          icon={{ name: 'settings-sharp', type: 'ionicon', borderRadius: 200, size: 15, color: 'white'}}
          buttonStyle={styles.button}
          containerStyle={{borderRadius: 200, marginRight: 5}}
          onPress={() => Navegation.navigate(EditReaderUserProfile)}
        />
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 5}}>
        <Ionicons name="person" size={24} color="black" />
        <Text
          style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}>
          "Nombre del usuario"
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 5}}>
        <FontAwesome name="calendar" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
          Fecha de nacimiento:
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 5}}>
        <MaterialIcons name="description" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
          biografía del usuario:
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 5}}>
        <Entypo name="book" size={12} color="black" />
        <Text style={{ marginLeft: 5, marginBottom: 5 }}>
          Géneros literarios favoritos:
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={styles.follow}
        >
          # Siguiendo
        </Text>
        <Text style={styles.follow}
        >
          # Seguido
        </Text>
      </View>
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
  image: {
    width: '40%',
    height: '300%',
    marginLeft: 5,
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
    fontStyle: 'italic',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    marginRight: 5
  },
})

export default ReaderUserProfile