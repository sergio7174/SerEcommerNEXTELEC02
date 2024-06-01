const categoryServices = require("../services/category.service");
const categoryModel = require("../model/Category");
// A slug is a string that is used to uniquely identify a resource
const slugify = require("slugify");


// add category
exports.addCategory = async (req,res,next) => {
  console.log('Estoy en category controller addcategory--->line 9');
  try {

    console.log("Estoy en category.controller - line 12");
    console.log("Estoy en category.controller - line 13 - req.body.name: "+req.body.name);
    console.log("Estoy en category.controller - line 14 - req.savedImage: "+req.savedImage);
    console.log("Estoy en category.controller - line 15 - req.savedImage: "+`http://localhost:7000/images/${req.savedImage}`);

    const category = await categoryModel.findOne({ name: req.body.name });
    if (category) {
        return res.status(200).json({ 
          status: 'false', 
          message: 'Category already exist',
          data: category,
         })
    }

    if (req.body.slug) {
      let newCategory = new categoryModel({ 
        name: req.body.name, 
        slug: req.body.slug, 
        description: req.body.description,
        status: slugify(req.body.status),
        imgURL:`http://localhost:7000/images/${req.savedImage}` });
      await newCategory.save();
      return res.status(200).json({ 
        status: 'true', 
        message: 'Category created Successfully', 
        data: newCategory })
  } else {
      let newCategory = new categoryModel({ 
        name: req.body.name, 
        slug: req.body.slug,
        status: slugify(req.body.status), 
        description: req.body.description,
        imgURL:`http://localhost:7000/images/${req.savedImage}`, });
      await newCategory.save();
      return res.status(200).json({ 
        status: 'true', 
        message: 'Category created Successfully', 
        data:newCategory })
  }  } catch (error) {
    console.log(error)
    next(error)
  }
}

// add all category
exports.getAllCategory = async (req,res,next) => {

  try {
    /***my admin block beginning */
    const category = await categoryModel.find({});
    return res.status(200).json({ 
      status: 'true', 
      message: 'All Categories fetched Successfully', 
      data: category,
      // Data to the rest of the system
      success:true,
      result:category, });
    /*** my admin block End */  


} catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'false', 
      message: `get category api issue : ${error}`, error })
}
}

// delete category
exports.deleteCategory = async (req,res,next) => {
 
  console.log("Estoy en category.controller - line 93 - delete Category")

  try {
     
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      // data to admin area
      status: 'true', 
      message: 'Category deleted successfully',
      data:category,
      // data to the system
      success:true,
      result:category,

    })

} catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'false', 
      message: `delete category api issue : ${error}`, error })
}

}

// update category
exports.updateCategory = async (req,res,next) => {
  try {

    console.log("Estoy en category.controller - line 98 - update Category")

    if (req.savedImage) {
      const category = await categoryModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        slug: slugify(req.body.slug),
        status: req.body.status,
        description: slugify(req.body.description),
        imgURL: `http://localhost:7000/images/${req.savedImage}`,
      
      
      
      }, { new: true });
      return res.status(200).json({ 
        // data to admin area
      status: 'true', 
      message: 'Category Updated successfully',
      data:category,
      // data to the system
      success:true,
      result:category,});
  } else {
      const category = await categoryModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        slug: slugify(req.body.name) ,
        description: slugify(req.body.description),
        status: req.body.status,
        //imgURL: `http://localhost:7000/images/${req.savedImage}`,
      
      
      }, { new: true });
      return res.status(200).json({ 
         // data to admin area
      status: 'true', 
      message: 'Category Updated successfully',
      data:category,
      // data to the system
      success:true,
      result:category})
  }


    /*res.status(200).json({
      status:'success',
      message:'Category update successfully',
      result,
    })*/
  } catch (error) {
    next(error)
  }
}



// add all category
exports.addAllCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.addAllCategoryService(req.body);
    res.json({
      message:'Category added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// add all category
exports.getShowCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getShowCategoryServices();
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}




// add all category
exports.getProductTypeCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getCategoryTypeService(req.params.type);
    res.status(200).json({
      success:true,
      result,
    })
  } catch (error) {
    next(error)
  }
}





// get single category
exports.getSingleCategory = async (req,res,next) => {
  try {
    const result = await categoryServices.getSingleCategoryService(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}