const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
})
/*userSchema.pre('save', function (next){
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash;
      next();
  })
})*/

const User = mongoose.model('User', userSchema)
module.exports = User
