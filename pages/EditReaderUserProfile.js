import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'

import {
    Button, CheckBox, Icon, Input, Tab, TabView
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import Profile from '../assets/profile-default.png'

import stylesReaderUserProfile from '../components/styled-components/stylesReaderUserProfile'
import TextField from '../components/TextField'

const EditReaderUserProfile = () => {

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passwordHash: ''
    })
    const [index, setIndex] = React.useState(0);

    const Navegation = useNavigation()

    return (
        <View style={stylesReaderUserProfile.container}>
            <Image
                source={Profile}
                style={styles.image}
                resizeMode='contain'

            />
            <View style={{ flexDirection: 'row' }}>
                <TextField
                    name='Nombre'
                    setText={(text) => _handleChange("firstName", text)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '55%',
        marginLeft: 5,
        alignSelf: 'center',
    },

})

export default EditReaderUserProfile