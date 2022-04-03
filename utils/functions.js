
const handleChange = (data, setData, item, e) => {
	let updatedValue = {};
	updatedValue = {[item]: e};
	setData(data => ({
			...data,
			...updatedValue
	}))
}

module.exports = {
	handleChange
}
