const ApiError = require('../errors/api-error');
const Category = require('../model/Category');
const Products = require('../model/Products');

// create category service
exports.createCategoryService = async (data) => {
  
  /*console.log('EStoy en category.service - line 7 -data.name: '+data.name);
  console.log('EStoy en category.service - line 8 -data.name: '+data.slug)

  const category = await Category.create(data);
  console.log('EStoy en category.service - line 11 - category: '+category)
  return category;*/
  
}

// create all category service
exports.addAllCategoryService = async (data) => {
  await Category.deleteMany()
  const category = await Category.insertMany(data);
  return category;
}

// get all show category service
exports.getShowCategoryServices = async () => {
  const category = await Category.find({status:'Show'}).populate('products');
  console.log("Estoy en category.service - line 27 - category: "+category.data.name)
  return category;
}

// get all category 
exports.getAllCategoryServices = async () => {
  const category = await Category.find({})
  return category;
}

// get type of category service
exports.getCategoryTypeService = async (param) => {
  const categories = await Category.find({productType:param}).populate('products');
  return categories;
}

// get type of category service
exports.deleteCategoryService = async (id) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
}

// update category
exports.updateCategoryService = async (id,payload) => {
  const isExist = await Category.findOne({ _id:id })

  if (!isExist) {
    throw new ApiError(404, 'Category not found !')
  }

  const result = await Category.findOneAndUpdate({ _id:id }, payload, {
    new: true,
  })
  return result
}

// get single category
exports.getSingleCategoryService = async (id) => {
  const result = await Category.findById(id);
  return result;
}