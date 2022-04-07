import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import { Button } from 'react-native-elements'

const ListBook = (props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setRead('true')}>
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
                            <Text style={{
                                fontWeight: 'bold',
                                marginRight: 5,
                            }}>
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

})

export default ListBook