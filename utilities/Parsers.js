const parseDate = (date) => {
  const dateObj = new Date(date)
  const day = (dateObj.getDate() + 1 < 10 ? '0' + dateObj.getDate() : dateObj.getDate())
  const month = (dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1)
  const year = dateObj.getFullYear()
  return `${day}/${month}/${year}`
}

const parseTime = (date) => {
  const dateObj = new Date(date)
  const hours = (dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours())
  const minutes = (dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes())
  const seconds = dateObj.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

module.exports = {
  parseDate,
  parseTime,
}
