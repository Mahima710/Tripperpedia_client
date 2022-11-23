export default function checkPhoneNumber(phone: string) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}
