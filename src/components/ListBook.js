import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import BookProfilePage from '../pages/Book/BookProfilePage'

const ListBook = (props) => {

    const Navegation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Navegation.navigate(BookProfilePage)}
            >
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: props.image }}
                        style={styles.profileButton}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={styles.text}>
                                {props.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'stretch',
        width: '97%',
        minHeight: 100,
        height: 'auto',
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        marginLeft: 5,
    },
    photoContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        marginRight: 10,
        alignSelf: 'center'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '100%',
        maxWidth: 260,
        marginRight: 10
    },
    profileButton: {
        height: 50,
        width: 50,
        borderRadius: 200
    },
    text:{
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 20,
        marginTop: '6%'
    }
})

export default ListBook