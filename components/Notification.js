import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableNativeFeedback
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FontAwesome } from '@expo/vector-icons';

import {
    parseDate,
    parseTime,
} from '../utilities/Parsers'
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const Notification = (props) => {
    return (

        <View
            style={styles.container}
        >
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginRight: 5,
                        }}>
                            {props.person}
                        </Text>
                        <Text>
                            te ha empezaso a seguir
                        </Text>
                    </View>
                </View>
                <FontAwesome name="circle" size={24} color="red" style={styles.icon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
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
        maxWidth: 280,
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
        alignSelf: 'flex-end',
        justifyContent: 'center',
        fontSize: 10
    },
})

export default Notification