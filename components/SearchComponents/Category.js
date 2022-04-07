import React from 'react'
import { View,   StyleSheet,   Text,} from 'react-native'
import {
    Image,
    Button,
  } from 'react-native-elements'

const Category = ({ name, imageUri }) => {

  return (
    <View style={styles.card}>

        <Button
            icon={
            <Image
            source={imageUri}
            style={styles.image}
            />
            }
            buttonStyle={{flex:3, justifyContent: 'center', alignContent: 'center', alignItems: 'center',backgroundColor: 'transparent',}}
            containerStyle={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: 130, height: 95,
            }}
            type='clear'
        />

        <View style={{flex:1, justifyContent: 'center', alignContent: 'center', alignItems:'center'}}>
            <Text style={styles.text}>{name}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 95,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    text: {
        fontWeight:'bold'
    },
    card: {
        height:130,
        width:130,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: '#dddd',
        borderRadius: 10
    }
})

export default Category
