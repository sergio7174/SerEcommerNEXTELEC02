import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminMenuSideBar from "@/components/adminDashboard/Sidebar/index";
import { CreateProduct } from "./createProductService";
/*** service to get all categories, to use it in product form *****/
import { GetAllCategoryService } from "../category/getAllCategoryService";

const AddProductArea = () => {

    // local const handle with useState hook
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // to handle Product image
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
 // local const handle with useState hook categories
 const [categories, setCategories] = useState([]);
 // const to handle select category component
 const [selectCategory, setSelectCategory] = useState(undefined);

 // function to handle select category component
 const onOptionChangeSelectCategory = (e) => {
  setSelectCategory(e.target.value);
  alert(
      "User Selected Value - ",
      e.target.value
  );
};

  // get all categories from backend
  const GetAllCategory =  () => { GetAllCategoryService(setCategories); };

  // get status data to status select form

  const statusOptions = [
    "in-stock",
    "out-of-stock",
    "discontinued",
];

  // function to handle status select component in form

  const onstatusOptionsChangeHandler = (e) => {setStatus(e.target.value)};

  // function to handle sending data products to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // data instance of FormData()
    const data = new FormData();

    data.append("name", name);
    data.append("code", code);
    data.append("unit", unit);
    data.append("description", description);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("brand", brand);
    data.append("category", selectCategory);
    data.append("status", status);
    data.append("discount", discount);
    data.append("image", image);
    

  /*** if the button submit is enable - use this validation way */
   /* if (!name){notifyError('Please Enter A Category name .. !!'); return}
    if (!slug){notifyError('Please Enter the Category Slug .. !!'); return}
    if (!description){notifyError('Please Enter A The Category Description .. !!'); return}*/

  // Check if name && slug && description have information
    if (name && code && description && unit && price && quantity && brand && selectCategory && status && discount) {
   
      //alert ('Estoy en addProduct-area - line 51 - description: '+description);
     
      //alert ('Estoy en addProduct-area - line 54 - data.image: '+data.image);

   CreateProduct(data);

   // set const name and slut to values "".
   setName("");
   setCode("");
   setDescription("");
   setUnit("");
   setPrice(0);
   setQuantity(0);
   setBrand("");
   setCategory("");
   setStatus(null);
   setDiscount(0);
   setSelectCategory(null);
   setImage(null);
   setImagePreview(null);
  
  }
};

useEffect(() => {
  // function call GetAllCategory()
  GetAllCategory();
  // reset select options in form
  setSelectCategory(null);
  setStatus(null);
  setImage(null);
  setImagePreview(null);
}, []);


  return (
    <>
  {/****** add category block ******/}

    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start',border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)'}}>
    <div style={{height: '120vh', width:'30vw'}}>
    <AdminMenuSideBar/>
    </div> 
    {/*** CENTER RECTANGULO STYLES */}
  <div style={{width:'50vw', border:'3px double gray', height:'85vh',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)', marginTop:30, borderRadius:20, boxShadow: '10px 10px'}}>

     <div className="container d-flex flex-column justify-content-center align-content-center">
        <div>

          <h3 className="text-center" style={{marginBottom:50}}>Add New Product</h3>
        </div>

       <div style={{marginBottom:20}} >
       <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column justify-content-center align-content-center">

              {/****Name and code block begining *****/}
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              <label for name>&nbsp;&nbsp;Name:</label>&nbsp;
                    <input type="text" name='name' className="form-control" placeholder='Enter new Product Name' value={name} onChange={(e) => setName(e.target.value)} style={{maxHeight:30, maxWidth:'25vw'}}/>
              </div>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              <label for code>&nbsp;&nbsp;Code:</label>&nbsp;
                    <input type="text" name='code' className="form-control" placeholder='Enter new Product Code' value={code} onChange={(e) => setCode(e.target.value)} style={{maxHeight:30, minWidth:'20vw'}}/>
              </div>
              </div>
               {/****Name and code block end *****/}
                {/****description and unit block begining *****/}
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              <label for description>&nbsp;&nbsp;Description:</label>&nbsp;
                    <input type="text" name='description' className="form-control" placeholder='Enter new Product Description' value={description} onChange={(e) => setDescription(e.target.value)} style={{maxHeight:30, minWidth:'25vw'}}/>
              </div>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              <label for unit>&nbsp;&nbsp;Unit:</label>&nbsp;
                    <input type="text" name='unit' className="form-control" placeholder='Enter Unit' value={unit} onChange={(e) => setUnit(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
              </div>
              </div>
               {/****Name and code block end *****/}
                {/****price, quantity, brand block begining *****/}
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              <label for price>&nbsp;&nbsp;Price:</label>&nbsp;
                    <input type="number" name='price' className="form-control" placeholder='Enter new Product Price' value={price} onChange={(e) => setPrice(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}} min="1"/>
              </div>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
                    <label for quantity>&nbsp;&nbsp;Quantity:</label>&nbsp;
                    <input type="number" name='quantity' className="form-control" placeholder='Enter new Product Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}} min='1'/>
                    
              </div>
              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
                    <label for brand>&nbsp;&nbsp;Brand:</label>&nbsp;
                    <input type="text" name='brand' className="form-control" placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
              </div>
              </div>
               {/****price, quantity, brand block end *****/}

                {/****category, status, discount block begining *****/}
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20}}>

              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
              
           
              <label for category style={{marginTop:10}}>&nbsp;&nbsp;Category:</label>&nbsp;
              <select onChange={onOptionChangeSelectCategory}>
                <option>Please choose one Category</option>
                {(categories).map((option, index) => {
                    return (
                        <option key={index}>
                            &nbsp;&nbsp;{option.name}
                        </option>
                    );
                })}
              </select>

               {/************ status block begining */}
              
              <label for status style={{marginTop:10}}>&nbsp;&nbsp;Status:</label>&nbsp;
              <select onChange={onstatusOptionsChangeHandler}>
                <option>Choose Status</option>
                {(statusOptions).map((option, index) => {
                    return (
                        <option key={index}>
                            &nbsp;&nbsp;{option}
                        </option>
                    );
                })}
              </select>


              {/*****status block end */}


              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
                    <label for discount>&nbsp;&nbsp;Discount:</label>&nbsp;
                    <input type="number" name='discount' className="form-control" placeholder='Enter Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
              </div>
              </div>
               {/****category, status, discount block end *****/}

              {/****image  block begining *****/}
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20,}}>
             
              <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'35vw'}}>
               <label>&nbsp;&nbsp;Product Image:&nbsp;</label>
            <input className='file-upload-input' type="file" name="image"
                id="" accept='.jpg, .jpeg, .png'
                onChange={event => {
                    const image = event.target.files[0];
                    setImage(image);
                    setImagePreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='Image'>
            </input>
            </div>

            <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'white', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'8vw', height:'12vh'}}>
             
           <img src={imagePreview} style={{width:'8vw', height:'11vh'}}/>
            </div>

            </div>
            
             {/****image  block End *****/}

          </div>   
          <div className="d-flex flex-row justify-content-around">   
          <button type="submit" className="btn btn-primary" disabled={
            !name || 
            !code || 
            !description || 
            !unit|| 
            !price|| 
            !quantity|| 
            !brand|| 
            !selectCategory || 
            !status || 
            !discount            
            }>Submit</button>
          <button className="btn btn-primary"><Link href={"/"}>Home</Link></button>
          </div> 
          </div>
      </form>
     </div>
     

    </div> 
    </div>


    
    </div>
    </>
  );
};

export default AddProductArea;