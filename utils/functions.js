import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native';

const handleChange = (data, setData, item, e) => {
	let updatedValue = {};
	updatedValue = { [item]: e };
	setData(data => ({
		...data,
		...updatedValue
	}))
}

const previousFourteenHours = (date) => {
	let currentDate = new Date()
	let postDate = new Date(date)
	return currentDate - postDate < 86400000
}

const permisionFunction = async () => {
	if (Platform.OS !== 'web') {
		const {
			status,
		} = await ImagePicker.requestCameraPermissionsAsync()
		if (status !== 'granted') {
			alert('Sorry, we need camera permissions to make this work!')
		}
	}
}

const pickImage = async () => {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 1
	}).catch(error => {
		console.log(`Error: ${error}`)
	})

	if (!result.cancelled) {
		return result.uri
	}
}

module.exports = {
	handleChange,
	previousFourteenHours,
	permisionFunction,
	pickImage
}
