const mongoose = require('mongoose')
const schema = mongoose.Schema
const slugify = require('slugify')

const courseSchema = new schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type:String,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
  },
  {
    timestamps: true,
  }
)

courseSchema.pre('validate',function(next){
  this.slug=slugify(this.name,{
    lower:true,
    strcit:true
  })
  next()
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course
