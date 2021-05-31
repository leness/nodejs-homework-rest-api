const { Schema, model } = require('mongoose');

  const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    
  },
    {
    versionKey: false,
    timestamps: true,
   
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
  },
  )

contactSchema.virtual('info').get(function () {
  return `This is contact ${this.name}`
})

contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/g
  return re.test(String(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact