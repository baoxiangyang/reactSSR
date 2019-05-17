const formatTime = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  const hour = formatNumber(date.getHours());
  const minute = formatNumber(date.getMinutes());
  const second = formatNumber(date.getSeconds());
  return format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('hh', hour).replace('mm', minute).replace('ss', second);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default formatTime;