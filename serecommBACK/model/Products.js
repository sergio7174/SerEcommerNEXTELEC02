const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const productsSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  imgURL:{
    type: String,
    required: true,
   
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  discount: {
    type: Number,
    min: [0, "Product price can't be negative"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },
  brand: {
    
  type: String,
  required: true},

  category: {
      type: String,
      required: true,
      lowercase : true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE} "
    },
    default: "in-stock",
  },
  description: {
    type: String,
    required: true
  },
  reviews: [{type:ObjectId, ref: 'Reviews' }],
  productType:{
    type:String,
    required: true,
    lowercase: true,
  },
  videoId: {
    type: String,
    required: false
  },
  additionalInformation: [{}],
  tags: [String],
  sizes: [String],
  offerDate:{
    startDate:{
      type:Date
    },
    endDate:{
      type:Date
    },
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
})


const Products = mongoose.model('Products', productsSchema)

module.exports = Products;