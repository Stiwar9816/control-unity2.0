export const randomPassword = (value: number) => {
  const letters = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVXYZabcdefghijklmnñopqrtuvwxyz*-/!#$%&_+¡'
  let password = ''
  for (let i = 0; i < value; i++) {
    password += letters[Math.floor(Math.random() * 73)]
  }
  return password
}