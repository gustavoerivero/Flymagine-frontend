import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Modal
} from 'react-native'

import {
    Button, CheckBox, Icon, Input, Tab, TabView
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'

import { Entypo } from '@expo/vector-icons';

import { handleChange } from '../utils/functions'

import stylesReaderUserProfile from '../components/styled-components/stylesReaderUserProfile'
import TextField from '../components/TextField'
import EmailField from '../components/EmailField'
import PasswordFieldUser from '../components/PasswordFieldUser'

const EditReaderUserProfile = () => {

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        biography: '',
        email: '',
        passwordHash: '',
        passwordHash2: '',
        disable: true,
        hide: true,
    })
    const [index, setIndex] = React.useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    const Navegation = useNavigation()

    const [shouldShow, setShouldShow] = useState(false);
    const [shouldShow2, setShouldShow2] = useState(true);

    const _handleChange = (item, value) => handleChange(userData, setUserData, item, value)

    return (
        <ScrollView>
            <View style={stylesReaderUserProfile.container}>
                <Button
                    buttonStyle={styles.button}
                    icon={
                        <ImageBackground
                            source={Profile}
                            style={styles.image}
                        >
                            <Icon
                                type='ionicon'
                                name='camera'
                                color='#C4C4C4'
                                size={30}
                                containerStyle={styles.containerIcon}
                            />
                        </ImageBackground>
                    }
                />
                <View style={{ backgroundColor: 'white', height: '100%', paddingTop: 10 }}>
                    <View style={styles.data}>
                        <Text style={styles.text}>
                            Datos básicos
                        </Text>
                        <TextField
                            name='Nombre'
                            setText={(text) => _handleChange("firstName", text)}
                            editable={false}
                        />
                        <TextField
                            name='Apellido'
                            setText={(text) => _handleChange("lastName", text)}
                        />
                        <TextField
                            name='Télefono'
                            setText={(text) => _handleChange("phone", text)}
                        />
                        <TextField
                            name='Dirección'
                            setText={(text) => _handleChange("address", text)}
                        />
                    </View>
                    <View style={styles.data}>
                        <Text style={styles.text}>
                            Datos detallados
                        </Text>
                        <TextField
                            name='Biografía'
                            setText={(text) => _handleChange("biography", text)}
                        />
                        <Button
                            title={'Géneros literarios'}
                            titleStyle={{ marginLeft: 5 }}
                            buttonStyle={styles.genButton}
                            icon={<Entypo name="book" size={20} color="black" />}
                        />
                    </View>
                    <View
                        style={styles.data}>
                        <Text style={styles.text}>
                            Datos de acceso
                        </Text>
                        <EmailField
                            name='Correo electrónico'
                            value={userData.email}
                            setValues={(text) => _handleChange("email", text)}
                        />
                        {shouldShow ? ([
                            <PasswordFieldUser
                                name='Nueva Contraseña'
                                value={userData.passwordHash}
                                setValues={(text) => _handleChange("passwordHash", text)}
                                disable={userData.disable}
                            />,
                            <PasswordFieldUser
                                name='Repetir Nueva Contraseña'
                                value={userData.passwordHash2}
                                setValues={(text) => _handleChange("passwordHash2", text)}
                                disable={userData.disable}
                            />
                        ]) : null}
                        {shouldShow2 ? (
                            <Button
                                title={'Cambiar contraseña'}
                                buttonStyle={styles.genButton}
                                onPress={() => [setShouldShow(!shouldShow), setShouldShow2(!shouldShow2),
                                _handleChange("disable", !userData.disable)]}
                            />
                        ) : null}
                        {shouldShow ? (
                            <Button
                                title={'Cancelar'}
                                buttonStyle={styles.genButton}
                                onPress={() => [setShouldShow(!shouldShow), setShouldShow2(!shouldShow2),
                                _handleChange("disable", !userData.disable)]}
                            />
                        ) : null}
                    </View>
                    <Button
                        title={'Guardar cambios'}
                        buttonStyle={styles.saveButton}
                        onPress={() => setModalVisible(true)}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>¿Seguro que desea cambiar los datos?
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title='Aceptar'
                                        buttonStyle={styles.modalButton}
                                        onPress={() => Navegation.navigate("Profile")}
                                    />
                                    <Button
                                        title='Cancelar'
                                        buttonStyle={styles.modalButton2}
                                        onPress={() => setModalVisible(false)}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 200,
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    genButton: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 200,
        width: '50%',
        alignSelf: 'flex-start',
        marginLeft: 7
    },
    containerIcon: {
        alignSelf: 'flex-end',
        flex: 1,
        justifyContent: 'flex-end',
        width: '50%',
        height: '50%'
    },
    text: {
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
    },
    data: {
        padding: 5,
        margin: 5,
        borderColor: 'rgba(134, 48, 197, .15)',
        borderRadius: 5,
        borderWidth: 1,
    },
    saveButton: {
        backgroundColor: 'purple',
        borderRadius: 200,
        width: '50%',
        alignSelf: 'center',
        margin: 10,
    },
    modalText: {
        fontSize: 17,
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#C4C4C4",
        borderRadius: 40,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '100%',
        height: '20%'
    },
    modalButton: {
        width: 170,
        marginHorizontal: 2.5,
        backgroundColor: '#9681DF',
        borderWidth: 1,
        borderColor: 'black'
    },
    modalButton2: {
        width: 170,
        marginHorizontal: 2.5,
        backgroundColor: '#F389E2',
        borderWidth: 1,
        borderColor: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
})

export default EditReaderUserProfile