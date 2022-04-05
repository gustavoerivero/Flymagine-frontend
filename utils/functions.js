
const handleChange = (data, setData, item, e) => {
	let updatedValue = {};
	updatedValue = {[item]: e};
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

module.exports = {
	handleChange,
	previousFourteenHours
}
