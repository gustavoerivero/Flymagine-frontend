import { StyleSheet } from 'react-native'

const stylesProfile = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: '#9681DF',
        paddingTop: 20,
        display: 'flex',
    },
    image: {
        height: '100%',
        maxWidth: 100,
        maxHeight: 125,
        marginLeft: 5,
        alignSelf: 'center',
        marginBottom: 75,
        marginTop: 40,
        borderRadius: 200,
        marginLeft: 25,
      },
      button: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 200,
        width: '100%',
        height: '100%',
        marginRight: 10,
        marginBottom: 50,
        marginTop: 30,
        maxWidth: 110,
        maxHeight: 39,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

export default stylesProfile