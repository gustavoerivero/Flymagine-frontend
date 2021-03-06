import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { Platform } from 'react-native'
import RegExp from '../utilities/RegEx';

const handleChange = (data, setData, item, e) => {
	let updatedValue = {};
	updatedValue = { [item]: e };
	setData(data => ({
		...data,
		...updatedValue
	}))
}

const before24hours = (date) => {
	let currentDate = new Date()
	let postDate = new Date(date)
	return currentDate - postDate < 86400000
}

const legalAge = (date) => {
	let currentDate = new Date()
	let postDate = new Date(date)
	return currentDate - postDate > 18 * 31536000000
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
		aspect: [1, 1],
		quality: 1
	}).catch(error => {
		console.log(`Error: ${error}`)
	})

	if (!result.cancelled) {
		return result
	}
}

const deleteValue = (data, setData, item) => {
	setData(data => ({
		...data,
		[item]: ''
	}))
}

const emailValidator = (email) => {
	return RegExp.regEmail.test(email) ? true : false
}

const passwordValidator = (password) => {
	return RegExp.regPassword.test(password) ? true : false
}

const phoneValidator = (phone) => {
	return RegExp.regPhone.test(phone) ? true : false
}

const selectOneFile = async () => {

	let result = await DocumentPicker.getDocumentAsync({
		type: 'application/pdf',
		allowsMultipleSelection: false
	})

	if (!result.cancelled) {
		return result
	}

	return null

}

module.exports = {
	handleChange,
	before24hours,
	permisionFunction,
	deleteValue,
	pickImage,
	emailValidator,
	passwordValidator,
	phoneValidator,
	legalAge,
	selectOneFile,
}
