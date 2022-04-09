import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import { Button } from 'react-native-elements'

const ListFollower = (props) => {

    const [read, setRead] = useState(props.check)
    const [shouldShow, setShouldShow] = useState(true)
    const [shouldShow2, setShouldShow2] = useState(true)

    return (
        <TouchableOpacity
            activeOpacity={0.9}>
            {shouldShow2 ? (
                <View style={styles.container}>
                    <View style={styles.photoContainer}>
                        <Image
                            source={{ uri: props.image }}
                            style={styles.profileButton}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}>
                                    {props.name}
                                </Text>
                                {shouldShow ? (
                                    <Text style={{ marginRight: 5, marginTop: '7%' }}>
                                        {read === 'false' ? (
                                            <Text
                                                style={{ color: 'blue' }}
                                                onPress={() => setShouldShow(false)}>
                                                Seguir
                                            </Text>
                                        ) : null}
                                    </Text>
                                ) : false}
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShouldShow2(false)}
                        >
                            <Text
                                style={styles.textButton}>
                                Eliminar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            ) : false}
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
        borderRadius: 50,
    },
    text: {
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 20,
        marginTop: '6%'
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        width: '100%',
        height: 25,
        maxWidth: 60,
        maxHeight: 100,
        alignSelf: 'flex-end'
    },
    textButton: {
        alignSelf: 'center',
        marginTop: 2,
        fontWeight: 'bold',
    }
})

export default ListFollower