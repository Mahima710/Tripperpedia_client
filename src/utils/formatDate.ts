export default function formatDate(date: string) {
  const dateArr = date.split("-").reverse();

  return dateArr.join("-");
}
