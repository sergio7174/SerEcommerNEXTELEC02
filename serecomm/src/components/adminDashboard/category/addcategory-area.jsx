import React, { useState } from "react";
import Link from "next/link";
import { notifyError, notifySuccess } from '@/utils/toast';
import AdminMenuSideBar from "@/components/adminDashboard/Sidebar/index";
import { CreateCategory } from "./createCategoryService";


const AddCategoryArea = () => {

// local const handle with useState hook
 // const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

// to handle category image
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  

 // function to handle status select component in form

 const onstatusOptionsChangeHandler = (e) => {setStatus(e.target.value)};
// get status data to status select form

const statusOptions = ['Show', 'Hide'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data instance of FormData()
    const data = new FormData();

    data.append("name", name);
    data.append("slug", slug);
    data.append("description", description);
    data.append("image", image);
    data.append("status", status);

  
    if (!name){notifyError('Please Enter A Category name .. !!'); return}
    if (!slug){notifyError('Please Enter the Category Slug .. !!'); return}
    if (!description){notifyError('Please Enter A The Category Description .. !!'); return}

  // Check if name && slug && description have information
    if (name && slug && description && status) {

      alert("Estoy en addcategory - line 49 - voy a createCategoryService")
   // CreateCategory(name,slug,description);
   CreateCategory(data);
   
   
    // set const name and slut to values "".
   setName("");
   setSlug("");
   setDescription("");
   setStatus(null);
   }
};


  return (
    <>

  {/****** add category block ******/}

    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start',border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)'}}>
    <div style={{height: '120vh', width:'30vw'}}>
    <AdminMenuSideBar/>
    </div> 
    {/*** CENTER RECTANGULO STYLES */}
  <div style={{width:'50vw', border:'3px double gray', height:'105vh',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)', marginTop:30, borderRadius:20, boxShadow: '10px 10px'}}>

     <div className="container d-flex flex-column justify-content-center align-content-center">
        <div>

          <h3 className="text-center" style={{marginBottom:50}}>Add New Category</h3>
        </div>

       <div style={{marginBottom:20}} >
       <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex flex-column justify-content-center align-content-center">

              <div style={{marginBottom:5}}>
                    <input type="text" name='name' className="form-control" placeholder='Enter new category' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div style={{marginBottom:20}}>
                    <input name='slug' type="text" className="form-control mt-3" placeholder='Enter slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
             </div>
              <div style={{marginBottom:20,}}>
                    <input type="text" name='description' className="form-control" placeholder='Enter new Category Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              {/************ status block begining */}
              <div style={{marginBottom:20,}}>
              <label for status style={{marginTop:10}}>&nbsp;&nbsp;Status:</label>&nbsp;&nbsp;&nbsp;
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

              {/*****status block end */}

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
          <button type="submit" className="btn btn-primary" disabled={!name || !slug || !description}>Submit</button>
          <button className="btn btn-primary"><Link href={"/"}>Home</Link></button>
          </div> 
      </form>
     </div>
     

    </div> 
    </div>


    
    </div>
    </>
  );
};

export default AddCategoryArea;