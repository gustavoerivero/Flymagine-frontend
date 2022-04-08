import React, { useState } from 'react'
import { handleChange } from '../utils/functions'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
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
import { MaterialCommunityIcons } from '@expo/vector-icons';




const EditBook = (selectedItems) => {

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

    const [shouldShow, setShouldShow] = useState(false);
    const [shouldShow2, setShouldShow2] = useState(true);
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

                <Button
                    buttonStyle={styles.button}
                    icon={
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
                    } />

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

                    <MultiSelect
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
                        styleDropdownMenuSubsection={{ backgroundColor: 'transparent', height: 65, }}
                        styleDropdownMenu={styles.genero}
                    />
                    {shouldShow ? (
                        <TouchableOpacity
                            style={styles.buttonD}
                            onPress={() => [setShouldShow2(true), setShouldShow(false)]}>

                            <FontAwesome5 name="upload" size={24} color="rgba(50, 0, 105, .5)" />
                            <Text>
                                Subir nuevo archivo PDF
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                    {shouldShow2 ? (
                        <TouchableOpacity
                            style={styles.buttonD}
                            onPress={() => [setShouldShow2(false), setShouldShow(true)]}>
                            <Ionicons name="md-trash-bin" size={24} color="rgba(50, 0, 105, .5)" />
                            <Text>
                                Eliminar archivo PDF
                            </Text>
                        </TouchableOpacity>
                    ) : null}
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
        width: 200,
        height: 200,
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
        marginTop: 8
    }
})

export default EditBook
