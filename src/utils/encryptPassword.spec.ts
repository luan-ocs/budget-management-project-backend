import { decryptPassword, encryptPassword } from 'src/utils/encryptPassword'

describe('Utils: Encrypt Password', () => {
  it('should encrypt password', () => {
    const password = 'abc'
    const hash = encryptPassword(password)

    expect(password).not.toBe(hash)
  })

  it('should decrypt password', () => {
    const password = 'abc'
    const hash = encryptPassword(password)

    expect(decryptPassword(password, hash)).toBe(true)
  })
})
