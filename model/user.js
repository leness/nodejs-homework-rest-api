const { Schema, model } = require('mongoose')
const {Gender} = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 8

  const userSchema = new Schema({
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
      },
      gender: {
          type: String,
          enum: [Gender.MALE, Gender.FEMALE, Gender.NONE],
          default: Gender.NONE,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/g
        return re.test(String(value).toLowerCase())
      }
    },
    password: { type: String, required: true },
    token: { type: String, default: null },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
    },
    {
    versionKey: false,
    timestamps: true,
  },
)
  

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User