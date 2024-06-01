const Brand = require("../model/Brand");
const productServices = require("../services/product.service");
const productModel = require("../model/Products");
// A slug is a string that is used to uniquely identify a resource
const slugify = require("slugify");


// add product
exports.addProduct = async (req, res,next) => {
  console.log('product--->',req.body);
 
  try {
     // to test data frontend
    /*console.log("Estoy en product.controller - line 41");
    console.log("Estoy en product.controller - line 42 - req.body.name: "+req.body.name);
    console.log("Estoy en product.controller - line 43 - req.savedImage: "+req.savedImage);
    console.log("Estoy en product.controller - line 44 - req.savedImage: "+`http://localhost:7000/images/${req.savedImage}`);*/

    const product = await productModel.findOne({ code: req.body.code });
    if (product) {
        return res.status(200).json({ 
          status: 'false', 
          message: 'Product already exist',
          data: product,
         })
    }

    if (req.body.code) {
      let newProduct = new productModel({ 
        name: req.body.name, 
        code: req.body.code, 
        description: req.body.description,
        category: slugify(req.body.category),
        unit: req.body.unit,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        product: req.body.product,
        status: slugify(req.body.status),
        discount: req.body.discount,
        imgURL:`http://localhost:7000/images/${req.savedImage}`,
      
      });
      await newProduct.save();
      return res.status(200).json({ 
        status: 'true', 
        message: 'Product created Successfully', 
        data: newProduct })
  } else {
      let newProduct = new productModel({ 
        name: req.body.name, 
        code: req.body.code, 
        description: req.body.description,
        unit: req.body.unit,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        product: req.body.product,
        status: slugify(req.body.status),
        category: slugify(req.body.category),
        discount: req.body.discount,
        imgURL: `http://localhost:7000/images/${req.savedImage}`,
      
      
      
      
      });
      await newProduct.save();
      return res.status(200).json({ 
        status: 'true', 
        message: 'Product created Successfully', 
        data:newProduct })
  }  } catch (error) {
    console.log(error)
    next(error)
  }
};


// add all product
module.exports.addAllProducts = async (req,res,next) => {
  try {
    const result = await productServices.addAllProductService(req.body);
    res.json({
      message:'Products added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get all products
exports.getAllProducts = async (req,res,next) => {

  console.log("Estoy en product.controller - line 94 - tuto ok: ");

  try {
    /***my admin block beginning */
    const product = await productModel.find({});
    return res.status(200).json({ 
      status: 'true', 
      message: 'All Products fetched Successfully', 
      data: product,
      // Data to the rest of the system
      success:true,
      result:product, });
    /*** my admin block End */  


} catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'false', 
      message: `get Product api issue : ${error}`, error })
}
}

// update product
exports.deleteProduct = async (req, res,next) => {
  console.log("Estoy en product.controller - line 119 - delete Product")

  try {
     
    const product = await productModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      // data to admin area
      status: 'true', 
      message: 'Product deleted successfully',
      data:product,
      // data to the system
      success:true,
      result:product,

    })

} catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'false', 
      message: `delete Product api issue : ${error}`, error })
}

};

// update product
exports.updateProduct = async (req, res,next) => {
 try {
    /* const product = await productServices.updateProductService(req.params.id,req.body)
    res.send({ data: product, message: "Product updated successfully!" });
  } catch (error) {
    next(error)
  }*/
  console.log("Estoy en product.controller - line 155 - update product");
  console.log("Estoy en product.controller - line 156 - req.body.code: "+req.body.code);
  console.log("Estoy en product.controller - line 157 - req.body.name: "+req.body.name);
  console.log("Estoy en product.controller - line 157 - req.body.description: "+req.body.description);

  console.log("Estoy en product.controller - line 155 - req.savedImage: "+req.savedImage);

    if (req.savedImage) {

      console.log("Estoy en product.controller - line 159 - req.body.code: "+req.body.code);
      

      const product = await productModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        code: req.body.code, 
        description: req.body.description,
        unit: req.body.unit,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        product: req.body.product,
        status: slugify(req.body.status),
        category: slugify(req.body.category),
        discount: req.body.discount,
        imgURL: `http://localhost:7000/images/${req.savedImage}`,
       }, { new: true });
      return res.status(200).send({ 
        // data to admin area
      status: 'true', 
      message: 'product Updated successfully',
      data:product,
      // data to the system
      success:true,
      result:product,});
  } else {
    console.log("Estoy en product.controller - line 184 - req.params.id: "+req.params.id)
      const product = await productModel.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        code: req.body.code, 
        description: req.body.description,
        unit: req.body.unit,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        product: req.body.product,
        category: slugify(req.body.category),
        status: slugify(req.body.status),
        discount: req.body.discount,
        //imgURL: `http://localhost:7000/images/${req.savedImage}`,
       }, { new: true });
      return res.status(200).json({ 
         // data to admin area
      status: 'true', 
      message: 'product Updated successfully',
      data:product,
      // data to the system
      success:true,
      result:product})
  }
  } catch (error) {
    next(error)
  }

};

// getSingleProduct
exports.getSingleProduct = async (req,res,next) => {
  try {
     
    console.log("Estoy en product.controller - line 224")
    const product = await productModel.findById(req.params.id);

    return res.status(200).json({
      // data to admin area
      status: 'true', 
      message: 'Product Find it successfully',
      data:product,
      // data to the system
      success:true,
      result:product,

    })

} catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'false', 
      message: `Finding Product api issue : ${error}`, error })
}
}


// get all products by type
module.exports.getProductsByType = async (req,res,next) => {
  try {
    const result = await productServices.getProductTypeService(req);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// get offer product controller
module.exports.getOfferTimerProducts = async (req,res,next) => {
  try {
    const result = await productServices.getOfferTimerProductService(req.query.type);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get Popular Product By Type
module.exports.getPopularProductByType = async (req,res,next) => {
  try {
    const result = await productServices.getPopularProductServiceByType(req.params.type);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get top rated Products
module.exports.getTopRatedProducts = async (req,res,next) => {
  try {
    const result = await productServices.getTopRatedProductService();
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}



// get Related Product
exports.getRelatedProducts = async (req,res,next) => {
  try {
    const products = await productServices.getRelatedProductService(req.params.id)
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
}



// update product
exports.reviewProducts = async (req, res,next) => {
  try {
    const products = await productServices.getReviewsProducts()
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.stockOutProducts = async (req, res,next) => {
  try {
    const products = await productServices.getStockOutProducts();
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.deleteProduct = async (req, res,next) => {
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json({
      message:'Product delete successfully'
    })
  } catch (error) {
    next(error)
  }
};

