import React, {
    useState,
} from 'react'
import {
    Text,
    View,
} from 'react-native'

import { Divider } from '@rneui/themed'

import styles from './Post/styled-components/styles'
import { Button, Image } from 'react-native-elements'

import { Chip } from 'react-native-paper'

import {
    parseDate,
    parseTime,
} from '../utilities/Parsers'

import {
    previousFourteenHours,
} from '../utils/functions'

import { useNavigation } from '@react-navigation/native'

const ListReview = (props) => {

    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(props.likes)
    const [comments, setComments] = useState(props.comments.length)

    const [editChoice, setEditChoice] = useState(false)
    const [editVisible, setEditVisible] = useState(false)

    const [deleteVisible, setDeleteVisible] = useState(false)
    const [deleteChoice, setDeleteChoice] = useState(false)

    const Navegation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                <Button
                    buttonStyle={styles.profileButton}
                    containerStyle={styles.profileButton}
                    icon={
                        <Image
                            source={{
                                uri: props.avatar
                            }}
                            style={styles.profileButton}
                        />
                    }
                    type='clear'
                    onPress={() => {
                        console.log(`${props.author}'s profile`)
                    }}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.title}>
                        <Text style={{
                            fontWeight: 'bold',
                            marginRight: 5,
                        }}>
                            {props.author}
                        </Text>
                        <Text style={{
                            fontSize: 10,
                            color: '#aaa',
                        }}>
                            {parseDate(props.date) + ' ' + parseTime(props.date)}
                        </Text>
                    </View>

                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >

                </View>


                <View>
                    <Divider />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text
                            style={styles.content}
                        >
                            {props.description}
                        </Text>
                    </View>
                    <Divider />
                    <View style={styles.actionsContainer}>
                        <Button
                            containerStyle={{
                                borderRadius: 50,
                            }}
                            buttonStyle={{
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                height: 30,
                                width: 50,
                            }}
                            icon={{
                                name: 'thumb-up',
                                type: 'material-community',
                                color: isLiked ? 'purple' : '#aaa',
                                size: 15,
                            }}
                            title={likes}
                            titleStyle={{
                                fontSize: 10,
                                color: isLiked ? 'purple' : '#aaa',
                            }}
                            onPress={() => {
                                setIsLiked(!isLiked)
                                setLikes(isLiked ? likes - 1 : likes + 1)
                                console.log(`${props.author}'s post liked`)
                            }}
                        />
                        <Button
                            containerStyle={{
                                borderRadius: 50,
                            }}
                            buttonStyle={{
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                height: 30,
                                width: 50
                            }}
                            icon={{
                                name: 'comment',
                                type: 'material-community',
                                color: '#aaa',
                                size: 15,
                            }}
                            title={comments}
                            titleStyle={{
                                fontSize: 10,
                                color: '#aaa',
                            }}
                            onPress={() => Navegation.navigate("CommentPage", { props: props })}
                        />
                    </View>
                </View>
            </View>
            <Divider
                color='black'
                inset={true}
                width={1}
            />
        </View>
    )
}

export default ListReview