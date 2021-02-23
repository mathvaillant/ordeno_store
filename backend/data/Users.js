import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'matheusvaillant505@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
