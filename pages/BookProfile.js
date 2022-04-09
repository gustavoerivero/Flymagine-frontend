import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import {
  Tab, 
  TabView, 
  AirbnbRating
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import BookImage from '../assets/book.jpg'

import {
  Ionicons,
  MaterialIcons,
  Entypo,
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'

import stylesProfile from '../components/styled-components/stylesProfile'
import EditBook from './EditBook'
import Dialog from '../components/Dialog'

import Review from '../components/Post/Review'

import dataReviews from '../utilities/data/reviews'

const BookProfile = () => {

  const Navegation = useNavigation()

  const [shouldShow, setShouldShow] = useState(true)
  const [shouldShow2, setShouldShow2] = useState(true)
  const [shouldShow3, setShouldShow3] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const [signIn, setSignIn] = useState('Adam Meddler')

  const [reviews, setReviews] = useState(dataReviews || [])

  return (
    <View style={[stylesProfile.container, { paddingTop: 30, }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image
          source={BookImage}
          style={stylesProfile.bookImage}
          resizeMode='stretch'
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 100 }}>
          <TouchableOpacity
            style={stylesProfile.button}
            activeOpacity={0.85}
            onPress={() => Navegation.navigate(EditBook)}
          >
            <Ionicons name="ios-settings-sharp" size={15} color="white" />
            <Text
              style={styles.textButton}>
              Editar libro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonE}
            activeOpacity={0.85}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="trash-bin" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            <Foundation name="book-bookmark" size={24} color="black" />
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}>
              "Nombre del libro"
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            <Ionicons name="person" size={12} color="black" />
            <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
              Autor del libro:
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            <FontAwesome name="calendar" size={12} color="black" />
            <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
              Fecha de registro:
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            <MaterialIcons name="description" size={12} color="black" />
            <Text style={{ marginLeft: 5, marginBottom: 2.5, }}>
              Sinopsis:
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
            <Entypo name="book" size={12} color="black" />
            <Text style={{ marginLeft: 5, marginBottom: 5 }}>
              Géneros:
            </Text>
          </View>
        </View>
        {shouldShow2 ? (
          <TouchableOpacity
            style={styles.buttonD}
            onPress={() => [setShouldShow(true), setShouldShow2(false), setShouldShow3(true)]}>
            <AntDesign name="pdffile1" size={24} color="red" />
          </TouchableOpacity>
        ) : false}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 5 }}>
        {shouldShow ? (
          <TouchableOpacity
            style={styles.buttonT}
            activeOpacity={0.85}
            onPress={() => [setShouldShow(false), setShouldShow2(true), setShouldShow3(false)]}
          >
            <Ionicons name="time" size={15} color="white" />
            <Text
              style={styles.textButton}>
              Por leer
            </Text>
          </TouchableOpacity>
        ) : false}
        {shouldShow3 ? (
          <TouchableOpacity
            style={styles.buttonT}
            activeOpacity={0.85}
            onPress={() => [setShouldShow(true), setShouldShow2(true), setShouldShow3(false)]}
          >
            <Ionicons name="checkmark-done-sharp" size={15} color="white" />
            <Text
              style={styles.textButton}>
              Leído
            </Text>
          </TouchableOpacity>
        ) : false}
      </View>
      <View style={{ alignSelf: 'flex-start', marginBottom: 5 }}>
        <AirbnbRating
          count={5}
          showRating={false}
          size={15}
        />
      </View>
      <Tab
        indicatorStyle={{
          backgroundColor: 'black',
          height: 3,
        }}
      >
        <Tab.Item
          title='Review'
          titleStyle={styles.text}
          containerStyle={styles.itemContainer}
          icon={<MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="black" />}
        />
      </Tab>

      <TabView>
        <TabView.Item style={{ backgroundColor: '#fff', width: '100%' }}>
          <ScrollView>
            {reviews.length > 0 && reviews ? reviews?.map((review, id) => (
              <Review
                key={review.id}
                signIn={signIn}
                author={review.owner.firstName + ' ' + review.owner.lastName}
                avatar={review.owner.picture}
                image={review.image}
                description={review.text}
                date={review.publishDate}
                likes={review.likes}
                comments={review.comments}
                tags={review.tags}
                personTags={review.personTags}
                id={id}
                rating={review.rating}
                posts={reviews}
                setPosts={setReviews}
              />
            )) :
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(110, 45, 220, .5)',
                  textAlign: 'center',
                  marginVertical: 10,
                }}
              >
                No hay reviews disponibles en este momento...
              </Text>
            }
          </ScrollView>
        </TabView.Item>
      </TabView>
      <Dialog
        visible={modalVisible}
        setVisible={setModalVisible}
        setChoice={setChoiceSelected}
        cancelButton={true}
        content='¿Estás seguro que desea eliminar este libro?'
        toNavigate='MyBook'
      />
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
  },
  buttonD: {
    backgroundColor: 'rgba(255, 255 ,255, .75)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    width: '100%',
    height: '100%',
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    maxWidth: 50,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonT: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    marginRight: 5,
    maxWidth: 110,
    maxHeight: 35,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  rating: {
    marginBottom: 5,
    marginTop: 5,
  },
  buttonE: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 200,
    width: '100%',
    height: '100%',
    marginRight: 10,
    maxWidth: 40,
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15
  }
})

export default BookProfile