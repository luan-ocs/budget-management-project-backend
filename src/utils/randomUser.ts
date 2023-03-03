import { faker } from '@faker-js/faker'

export const createRandomUser = () => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.exampleEmail(),
    isAdmin: faker.datatype.boolean(),
    password: faker.internet.password(),
    birthday: faker.date.birthdate(),
    gender: faker.name.sexType(),
    work: faker.name.jobTitle(),
    createdAt: new Date(),
  }
}
