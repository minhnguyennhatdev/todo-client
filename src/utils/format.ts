export const formatDate = (date: string | Date, format: string) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()
  return format
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('YYYY', year.toString())
    .replace('hh', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'))
}