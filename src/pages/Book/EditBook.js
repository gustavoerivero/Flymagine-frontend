import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import {
  Icon,
  Button
} from 'react-native-elements'

import SectionedMultiSelect from 'react-native-sectioned-multi-select'

import TextField from '../../components/TextField'
import DateField from '../../components/DateField'
import Dialog from '../../components/Dialog'
import stylesProfile from '../../components/styled-components/stylesProfile'
import BookImage from '../../../assets/book.jpg'

import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'

import {
  handleChange,
  pickImage,
  selectOneFile,
  permisionFunction,
} from '../../utils/functions'

import literaryGenres from '../../utilities/data/literaryGenre'

const EditBook = (selectedItems) => {

  const [userData, setUserData] = useState({
    name: '',
    image: '',
    document: '',
    registerDate: '',
    sinopsis: '',
    selectedItems: []
  })

  const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)

  const [modalVisible, setModalVisible] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)

  const onSelectedItemsChange = (selectedItems) => setUserData({ selectedItems })

  const [shouldShow, setShouldShow] = useState(false)
  const [shouldShow2, setShouldShow2] = useState(true)

  const items = literaryGenres

  useEffect(() => {
    permisionFunction()
  }, [])

  return (

    <View>
      <View style={stylesProfile.container} >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Upload image')
            let image = pickImage()
            image.then(res => {
              _handleChange('image', res)
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }}
        >
          <ImageBackground
            source={userData.image ? { uri: userData.image } : BookImage}
            style={styles.image}
            imageStyle={styles.image}
            resizeMode='stretch'
          >
            <Icon
              type='ionicon'
              name="camera"
              size={24}
              color="white"
              containerStyle={styles.containerIcon}
            />
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ backgroundColor: 'white', paddingTop: 5 }}>
          <TextField
            name='Nombre'
            setText={(text) => _handleChange("firstName", text)}
          />
          <TextField
            name='Sipnosis'
            multiline={true}
            setText={(text) => _handleChange("sinopsis", text)}
          />

          <SectionedMultiSelect
            items={items}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="children"
            selectText="Géneros literarios"
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={userData.selectedItems}
            searchPlaceholderText='Buscar género'
            confirmText='Confirmar'
            colors={{ primary: 'purple', selectToggleTextColor: 'rgba(50, 0, 105, .5)', }}
            styles={{ selectToggle: styles.genero, selectToggleText: styles.selectText, }}
          />
          {shouldShow ? (
            <TouchableOpacity
              style={styles.buttonD}
              onPress={() => {
                console.log('Upload document')
                let document = ''
                selectOneFile().then(res => {
                  _handleChange('document', res)
                  setShouldShow2(true)
                  setShouldShow(false)
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
              }}
            >
              <FontAwesome5 name="upload" size={24} color="rgba(50, 0, 105, .5)" />
              <Text>
                Subir nuevo archivo PDF
              </Text>
            </TouchableOpacity>
          ) :
            shouldShow2 ? (
              <TouchableOpacity
                style={styles.buttonD}
                onPress={() => {
                  _handleChange('document', null)
                  console.log(userData.document)
                  setShouldShow2(false)
                  setShouldShow(true)
                }}
              >
                <Ionicons name="md-trash-bin" size={24} color="rgba(50, 0, 105, .5)" />
                <Text>
                  Eliminar archivo PDF
                </Text>
              </TouchableOpacity>
            ) : null}
          <Button
            title={'Guardar cambios'}
            buttonStyle={styles.saveButton}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      <Dialog
        visible={modalVisible}
        setVisible={setModalVisible}
        setChoice={setChoiceSelected}
        cancelButton={true}
        content='¿Estás seguro que desea guardar los cambios realizados en este libro?'
        toNavigate='MyBook'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    height: '85%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  button: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 200,
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  containerIcon: {
    alignSelf: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    width: '50%',
    height: '50%'
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
    maxWidth: 150,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35
  },
  saveButton: {
    backgroundColor: 'purple',
    borderRadius: 200,
    width: '50%',
    alignSelf: 'center',
    margin: 10,
    marginTop: 45
  },
  genero: {
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(235, 235, 255, .75)',
    borderColor: 'grey',
    borderRadius: 5,
    height: 70,
    marginTop: 8,
  },
  selectText: {
    fontSize: 18,
    marginLeft: 18,
    marginTop: 47,
    marginRight: 18,
  }
})

export default EditBook
