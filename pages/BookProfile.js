import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'

import {
    Button, Icon, Tab, TabView, Rating, AirbnbRating
} from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

import BookImage from '../assets/book.jpg'

import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'


import stylesProfile from '../components/styled-components/stylesProfile'

const BookProfile = () => {

    const [index, setIndex] = React.useState(0);

    const Navegation = useNavigation()

    return (
        <View style={stylesProfile.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image
                    source={BookImage}
                    style={stylesProfile.image}
                    resizeMode='stretch'
                />
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
                <TouchableOpacity
                    style={styles.buttonD}>
                    <AntDesign name="pdffile1" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'flex-start', marginBottom: 5}}>
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
                <TabView.Item style={{ backgroundColor: '#C4C4C4', width: '100%' }}>
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
    rating: {
        marginBottom: 5,
        marginTop: 5,
    },
})

export default BookProfile