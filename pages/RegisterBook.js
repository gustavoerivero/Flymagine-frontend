import React, { useState } from 'react'
import { handleChange } from '../utils/functions'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { Icon, Button } from 'react-native-elements'

import MultiSelect from 'react-native-multiple-select';

import TextField from '../components/TextField'
import DateField from '../components/DateField'
import Dialog from '../components/Dialog'
import stylesProfile from '../components/styled-components/stylesProfile'
import BookImage from '../assets/book.jpg'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const RegisterBook = (selectedItems) => {

    const [userData, setUserData] = useState({
        name: '',
        registerDate: '',
        sinopsis: '',
        selectedItems: []
    })

    const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)

    const [modalVisible, setModalVisible] = useState(false)
    const [choiceSelected, setChoiceSelected] = useState(false)

    const onSelectedItemsChange = (selectedItems) => setUserData({ selectedItems })


    var items = [
        {
            id: '667atsas',
            name: 'Comedia'
        },
        {
            id: 'djsjudksjd',
            name: 'Cuento para niño'
        },
        {
            id: 'nahs75a5sg',
            name: 'Drama'
        },
        {
            id: 'a0s0a8ssbsd',
            name: 'Misterio'
        },
        {
            id: 'suudydjsjd',
            name: 'Histórico'
        }, {
            id: '92iijs7yta',
            name: 'Terror'
        }, {
            id: '16hbajsabsd',
            name: 'Tragedia'
        },
        {
            id: 'sdhyaysdj',
            name: 'Tragicomedia'
        }, {
            id: 'hsyasajs',
            name: 'Romance'
        },
    ];

    return (

        <View>
            <View style={stylesProfile.container} >

                <TouchableOpacity
                    style={styles.button}
                >
                    <ImageBackground
                        source={BookImage}
                        style={styles.image}
                        resizeMode='stretch'
                    >
                        <Icon
                            type='ionicon'
                            name="camera"
                            size={24}
                            color="white"
                            containerStyle={styles.containerIcon} />

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
                    <DateField
                        name='Fecha de registro'
                        value={userData.registerDate}
                        setValues={(text) => _handleChange("registerDate", text)}
                    />

                    <MultiSelect
                    fixedHeight={true}
                        hideTags
                        items={items}
                        uniqueKey="id"
                        selectedItems={[selectedItems]}
                        selectText="Selecciona géneros"
                        styleTextDropdownSelected={{ color: 'rgba(50, 0, 105, .5)', marginLeft: 18, fontSize: 17 }}
                        onSelectedItemsChange={onSelectedItemsChange}
                        searchInputPlaceholderText="Buscar géneros..."
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC', }}
                        submitButtonColor="rgba(0, 0, 0, .5)"
                        submitButtonText="Guardar"
                        styleDropdownMenuSubsection={{backgroundColor: 'transparent', height: 65,}}
                        styleDropdownMenu={styles.genero}
                    />
                    <TouchableOpacity
                        style={styles.buttonD}>
                        <FontAwesome5 name="upload" size={24} color="rgba(50, 0, 105, .5)" />
                        <Text>
                            Subir archivo PDF
                        </Text>
                    </TouchableOpacity>
                    <Button
                        title={'Guardar libro'}
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
                content='¿Estás seguro que desea registrar este libro?'
                toNavigate='MyBook'
            />
        </View >
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
    imageBackground: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 170,
        marginHorizontal: 2,
        backgroundColor: '#9681DF'
    },

    text: {
        color: 'white'
    },
    checkbox: {
        backgroundColor: 'transparent',
        width: '95%',
        borderColor: 'transparent'
    },
    checkboxText: {
        color: 'white'
    },
    buttonRecover: {
        height: 35,
        width: '100%',
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
    button: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        borderRadius: 200,
        width: 125,
        height: 125,
        marginBottom: 10,
        marginLeft: 8
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
        marginTop: 35
    },
    genero: {
        marginHorizontal: 8, 
        borderWidth: 1,
        backgroundColor: 'rgba(235, 235, 255, .75)', 
        borderColor: 'grey', 
        borderRadius: 5,
        height: 70,
        marginTop: 8
    }
})

export default RegisterBook
