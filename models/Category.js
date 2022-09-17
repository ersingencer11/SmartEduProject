const mongoose = require('mongoose')
const schema = mongoose.Schema
const slugify = require('slugify')

const categorySchema = new schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type:String,
      unique: true
    }
  }
)

categorySchema.pre('validate',function(next){
  this.slug=slugify(this.name,{
    lower:true,
    strcit:true
  })
  next()
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
