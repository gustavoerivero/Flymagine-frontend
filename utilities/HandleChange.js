const handleChange = (setValues, values, input) => (e) => {
    setValues({ ...values, [input]: e })
}

export default handleChange