import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignContent: 'stretch',
    width: '100%',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 60,
    minHeight: 30,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  titleButtons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  }, 
  button: {
    borderRadius: 80,
  },
  descriptionContainer: {
    paddingLeft: 10,
    marginBottom: 5,
    marginRight: 70,
  },
  content: {
    textAlign: 'justify',
    fontSize: 12,
    marginBottom: 5,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: '20%',
  },
  image: {
    width: '50%',
    height: 200,
    margin: 5,
  },

})

export default styles