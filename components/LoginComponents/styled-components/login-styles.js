import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(40, 10, 57, .5)',
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 50,
  },
  label: {
    color: 'white'
  }
})

export default styles