"use client"; // cause don't need speed or user interaction
import  { useEffect, useState }   from "react";
import  AdminMenuSideBar          from "@/components/adminDashboard/Sidebar/index";
import  {GetAllProductService}   from "./getAllProductService";
import  { DeleteProductService } from "./deleteProductService";
import  { UpdateProductService } from "./updateProductService";
import  { Modal }                 from "antd";
/*** service to get all categories, to use it in product form *****/
import { GetAllCategoryService } from "../category/getAllCategoryService";

/** to build search component */
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

/****Search area */
import { useSearchParams } from "next/navigation";

const EditDelProductArea = () => {

     // local const handle with useState hook
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  
    // const to handle state update function

  const [updatedcode, setUpdatedCode] = useState("");
  const [updatedunit, setUpdatedUnit] = useState("");
  const [updatedprice, setUpdatedPrice] = useState(0);
  const [updateddiscount, setUpdatedDiscount] = useState(0);
  const [updatedquantity, setUpdatedQuantity] = useState(0);
  const [updatedbrand, setUpdatedBrand] = useState("");
  const [updatedcategory, setUpdatedCategory] = useState("");
  const [updatedstatus, setUpdatedStatus] = useState("");
  const [updatedname, setUpdatedName] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [updateddescription, setUpdatedDescription] = useState("");
  const [categories, setCategories] = useState([]);
   
  // const to handle state search function

    const searchParams = useSearchParams();
    const [searchdata, setSearchdata] = useState("");

    // const to handle modal
  
    const [open, setOpen] = useState(false);

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

// get status data to status select form

const statusOptions = [
  "in-stock",
  "out-of-stock",
  "discontinued",
];

// function to handle status select component in form

const onstatusOptionsChangeHandler = (e) => {setUpdatedStatus(e.target.value)};

      // get all categories from backend
  const GetAllCategory =  () => { GetAllCategoryService(setCategories); };

    // get all products from backend
    const GetAllProduct =  () => { GetAllProductService(setProducts); };

    //delete Product func
    const deleteProduct = (Product) => {
    //alert('Product._id:'+Product._id); To test data id
    DeleteProductService(Product._id);
    GetAllProduct();
    // refresh page - after deleting Product - It only reloaded the client and not the server.
    window.location.reload();
  
  };

   //update Product
   const handleUpdate = async (e) => {
    e.preventDefault();

      alert("Estoy en handleUpdate - editDelProduct-area - line 63 - updatedname: "+updatedname);
      alert("Estoy en handleUpdate - editDelProduct-area - line 64 - updatedcode: "+updatedcode);


        // data instance of FormData()
    const data = new FormData();

    data.append("name", updatedname);
    data.append("code", updatedcode);
    data.append("unit", updatedunit);
    data.append("description", updateddescription);
    data.append("price", updatedprice);
    data.append("quantity", updatedquantity);
    data.append("brand", updatedbrand);
    data.append("category", selectCategory);
    data.append("status", updatedstatus);
    data.append("discount", updateddiscount);
    data.append("image", image);
    

    UpdateProductService(selected,data); // get data from backend with axios                          

    // clean fields forms

        setUpdatedName("");
        setUpdatedDescription("");
        setUpdatedCode("");
        setUpdatedUnit("");
        setUpdatedDescription("");
        setUpdatedPrice(0);
        setUpdatedQuantity(0);
        setUpdatedBrand("");
        setUpdatedCategory(null);
        setUpdatedStatus(null);
        setUpdatedDiscount(0);
        setSelectCategory(null);
        setImage(null);
        setImagePreview(null);

        setOpen(false);
        setSelected(null);
        GetAllProduct();
        // refresh page - after deleting Product - It only reloaded the client and not the server.
    window.location.reload();}
 

  useEffect(() => {
    // function call GetAllProduct()
    GetAllProduct();
    // function call GetAllCategory()
  GetAllCategory();
  // reset select options in form
  setSelectCategory(null);
  setImage(null);
  setImagePreview(null);
  }, []);

  return (
    <>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start',border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)'}}>

    <div style={{height: '120vh', width:'12vw'}}>
    <AdminMenuSideBar/>
    </div> 
 {/*** CENTER RECTANGULO STYLES */}
 <div style={{width:'80vw', border:'3px double gray', height:'100vh',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)', marginTop:30,borderRadius:20, boxShadow: '10px 10px'}}>

<div className="container d-flex flex-column justify-content-center align-content-center">
   <div>
   {/*****SEarch area beging */}  

     <MDBInputGroup>
      <MDBInput
         placeholder="Search Product Item By Name"
         onChange={(e) =>{setSearchdata(e.target.value)}}
         defaultValue={searchParams?.searchTerm?.toString()}
        name="searchTerm"
         />
      <MDBBtn rippleColor='dark'>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
   
    {/*****SEarch area End */} 

     <h3 className="text-center" style={{marginBottom:40, marginTop:20}}>Edit/Delete Table Product</h3>
   </div>

  <div style={{marginBottom:20}} >

  {/*************  table area block Begining ****************** */}
  <span>
  {/*** SearchData block ********/}
   <div className="table-responsive" style={{overflowY:'scroll',
                           maxHeight:'80vh', overflowX:'scroll'}}>
        <table className="table table-responsive" style={{borderRadius:10}}>
          <thead className="table-dark" style={{position:'sticky', top:0}}>
            <tr>
            <th scope="col" className="text-center">Id</th>
              <th scope="col" className="text-center">Name</th>
              <th scope="col" className="text-center">Code</th>
              <th scope="col" className="text-center">Description</th>
              <th scope="col" className="text-center">Image</th>
              <th scope="col" className="text-center">Unit</th>
              <th scope="col" className="text-center">Price</th>
              <th scope="col" className="text-center">Quantity</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/***if there are products - show table */}
            {products.filter((Product) => {
            if (searchdata == null) {
                return Product
            } else if (Product.code.toLowerCase().includes(searchdata.toLowerCase())) {
                return Product
            }
        }).map((Product) => (
              <tr key={Product._id}>
                <td className="text-center">{Product._id}</td>
                <td className="text-center">{Product.name}</td>
                <td className="text-center">{Product.code}</td>
                <td className="text-center">{Product.description}</td>
                <td className="text-center"><img src={Product.imgURL} height='90' width='80' style={{borderRadius:5}}/></td>
                <td className="text-center">{Product.unit}</td>
                <td className="text-center">{Product.price}</td>
                <td className="text-center">{Product.quantity}</td>
                <td className="text-center">
                  
                <button className="btn btn-primary m-2" onClick={() => { setOpen(true);      setUpdatedName(Product.name); 
                setUpdatedCode(Product.code); 
                setUpdatedDescription(Product.description);
                setUpdatedUnit(Product.unit);
                setUpdatedPrice(Product.price);
                setUpdatedQuantity(Product.quantity);
                setUpdatedBrand(Product.brand);
                setUpdatedCategory(Product.category);
                setUpdatedStatus(Product.status);
                setUpdatedDiscount(Product.discount);
                setSelected(Product);
                setImage(Product.imgURL );}}>Edit</button>
                  <button className="btn btn-danger ms-2" onClick={() =>{setSelected(Product), deleteProduct(Product)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>                              
  </span>
</div>

{/************************************************************** */}

<Modal onCancel={() => setOpen(false)} open={open} footer={null} style={{background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)',minWidth:'50vw', minHeight:90 ,padding:30}}>
  
 {/*** CENTER RECTANGULO STYLES */}
  
<div>
    <h4 style={{textAlign:'center', marginBottom:20}}>Product - Update</h4>
</div>
   <form onSubmit={handleUpdate} >
          <div className="mb-3 d-flex flex-column justify-content-center align-content-center">

{/****Name and code block begining *****/}
<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
<label for name>&nbsp;&nbsp;Name:</label>&nbsp;
      <input type="text" name='name' className="form-control" placeholder='Enter new Product Name' value={updatedname} onChange={(e) => setUpdatedName(e.target.value)} style={{maxHeight:30, maxWidth:'25vw'}}/>
</div>

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
<label for code>&nbsp;&nbsp;Code:</label>&nbsp;
      <input type="text" name='code' className="form-control" placeholder='Enter new Product Code' value={updatedcode} onChange={(e) => setUpdatedCode(e.target.value)} style={{maxHeight:30, minWidth:'20vw'}}/>
</div>
</div>
 {/****Name and code block end *****/}
  {/****description and unit block begining *****/}
<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
<label for description>&nbsp;&nbsp;Description:</label>&nbsp;
      <input type="text" name='description' className="form-control" placeholder='Enter new Product Description' value={updateddescription} onChange={(e) => setUpdatedDescription(e.target.value)} style={{maxHeight:30, minWidth:'25vw'}}/>
</div>

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
<label for unit>&nbsp;&nbsp;Unit:</label>&nbsp;
      <input type="text" name='unit' className="form-control" placeholder='Enter Unit' value={updatedunit} onChange={(e) => setUpdatedUnit(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
</div>
</div>
 {/****Name and code block end *****/}
  {/****price, quantity, brand block begining *****/}
  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
<label for price>&nbsp;&nbsp;Price:</label>&nbsp;
      <input type="number" name='price' className="form-control" placeholder='Enter new Product Price' value={updatedprice} onChange={(e) => setUpdatedPrice(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}} min="1"/>
</div>

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
      <label for quantity>&nbsp;&nbsp;Quantity:</label>&nbsp;
      <input type="number" name='quantity' className="form-control" placeholder='Enter new Product Quantity' value={updatedquantity} onChange={(e) => setUpdatedQuantity(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}} min='1'/>
      
</div>
<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
      <label for brand>&nbsp;&nbsp;Brand:</label>&nbsp;
      <input type="text" name='brand' className="form-control" placeholder='Enter Brand' value={updatedbrand} onChange={(e) => setUpdatedBrand(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
</div>
</div>
 {/****price, quantity, brand block end *****/}

  {/****category, status, discount block begining *****/}
  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20}}>

   {/*********** category input option bock begining  ****************/}

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
{/*<label for category>&nbsp;&nbsp;Category:</label>&nbsp;
      <input type="text" name='category' className="form-control" placeholder='Enter Category' value={updatedcategory} onChange={(e) => setUpdatedCategory(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
          </div> */}

<label for category style={{marginTop:-2}}>&nbsp;&nbsp;Category:</label>&nbsp;
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
  </div>
{/*********** category input option block end   ****************/}

   {/*********** status input option bock begining  ****************/}

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
    {/*  <label for status>&nbsp;&nbsp;Status:</label>&nbsp;
      <input type="text" name='status' className="form-control" placeholder='Enter Status' value={updatedstatus} onChange={(e) => setUpdatedStatus(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
      
</div>*/}
<label for status style={{marginTop:-2}}>&nbsp;&nbsp;Status:</label>&nbsp;
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
  </div>
{/*********** status input option block end   ****************/}

<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray'}}>
      <label for discount>&nbsp;&nbsp;Discount:</label>&nbsp;
      <input type="number" name='discount' className="form-control" placeholder='Enter Discount' value={updateddiscount} onChange={(e) => setUpdatedDiscount(e.target.value)} style={{maxHeight:30, maxWidth:'10vw'}}/>
</div>
</div>
 
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
           <div> 
            <img src={imagePreview} style={{width:'8vw', height:'11vh'}}/>
          </div>
          <div>
            <img src={image} style={{width:'8vw', height:'11vh'}}/>
          </div>
           </div>

           </div>
           
            {/****image  block End *****/}

</div>   

                  <button type="submit" className="btn btn-primary">Submit</button>
                
    </form>
                
      </Modal>
</div> 
</div>

            </div>
     </>

)}

export default EditDelProductArea;