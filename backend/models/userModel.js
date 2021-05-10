import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchemma = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

userSchemma.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchemma.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // Will skip the hash of the password
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchemma)

export default User
