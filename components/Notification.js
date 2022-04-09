import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import { Button } from 'react-native-elements'

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import ReaderUserProfile from '../pages/ReaderUserProfile'
import Book from '../pages/Book';

import {
    parseDate,
    parseTime,
} from '../utilities/Parsers'
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps'

const Notification = (props) => {

    const Navegation = useNavigation()
    const [read, setRead] = useState(props.check)
    const [page, setPage] = useState(props.page)

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { setRead(true)
             console.log(props.page)}}>
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: props.avatar }}
                        style={styles.profileButton}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={{
                            fontSize: 10,
                            color: '#aaa',
                        }}>
                            {parseDate(props.date) + ' ' + parseTime(props.date)}
                        </Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Text style={{
                                fontWeight: 'bold',
                                marginRight: 5,
                            }}>
                                {props.person}
                            </Text>
                            <Text>
                                {props.text}
                            </Text>
                        </View>
                    </View>
                </View>
                {read === 'false' ? (
                <FontAwesome name="circle" size={24} color="red" style={styles.icon}/>
                ) : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'stretch',
        width: '100%',
        minHeight: 100,
        height: 'auto',
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
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
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
    },
    icon: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 200,
        width: '100%',
        maxWidth: 250,
        alignSelf: 'flex-end',
        marginLeft: 1,
        fontSize: 1
    },

})

export default Notification