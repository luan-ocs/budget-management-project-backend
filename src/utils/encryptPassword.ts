import bcrypt from 'bcrypt'

const saltRounds = 10

export const encryptPassword = (password: string): string => {
  const hash = bcrypt.genSaltSync(saltRounds)

  return bcrypt.hashSync(password, hash)
}

export const decryptPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}
