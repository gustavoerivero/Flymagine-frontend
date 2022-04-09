import React, { useState, } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import ListBook from '../components/ListBook'
import dataBooks from '../utilities/data/books'
import RegisterBook from './RegisterBook'

import { AntDesign } from '@expo/vector-icons';

import {
  handleChange
} from '../utils/functions'

const MyBook = () => {

  const [books, setBooks] = useState(dataBooks)
  const [data, setData] = useState([])
  const Navegation = useNavigation()

  const _handleChange = (item, value) => handleChange(books, setBooks, item, value)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => Navegation.navigate(RegisterBook)}
      >
        <AntDesign name="plus" size={24} color="black" style={styles.textButton}/>

      </TouchableOpacity>
      <ScrollView>
        {books?.map((myBook) => (
          <ListBook
            key={myBook.id}
            name={myBook.book.name}
            image={myBook.book.picture}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#F9F7F8',
    paddingTop: 10
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgba(150, 129, 223, 1)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 25,
    width: '100%',
    height: 30,
    maxWidth: 30,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 5,
    justifyContent: 'center'

  },
  textButton: {
    alignSelf: 'center',
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 17.5,
  }
})

export default MyBook