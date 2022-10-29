export function dateString(target_date) {
  const year = target_date.getFullYear();
  const month = target_date.getMonth() + 1;
  const date = target_date.getDate();
  const date_string = `${year}年/${month}月/${date}日`;
  return date_string;
}

// export function sameDate(date1,date2) {
//   if(date1.getDate() !== date2.getDate()) {
//     return false
//   }
//   if(date1.getMonth() !== date2.getMonth()) {
//     return false
//   }
//   return date1.getFullYear() === date2.getFullYear()
// }

export function sameDate(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
