"use client"; // cause dont need speed or user interaction
import  { useEffect, useState } from "react";
import AdminMenuSideBar from "@/components/adminDashboard/Sidebar/index";
import  {GetAllCategoryService}  from "./getAllCategoryService";
import { DeleteCategoryService } from "./deleteCategoryService";
import { UpdateCategoryService } from "./updateCategoryService";
import { Modal } from "antd";

/** to build search component */
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

/****Search area */
import { useSearchParams } from "next/navigation";


const EditDelCategoryArea = () => {

     // local const handle with useState hook
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  
    // const to handle state update function
  const [updatedName, setUpdatedName] = useState("");
  const [updatedSlug, setUpdatedSlug] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

    // const to handle state search function

    const searchParams = useSearchParams();
    const [searchdata, setSearchdata] = useState("");

    // const to handle modal
  
    const [open, setOpen] = useState(false);

    // get all categories from backend
    const GetAllCategory =  () => { GetAllCategoryService(setCategories); };

    //delete category func
    const deleteCategory = (category) => {
    //alert('Category._id:'+category._id); To test data id
    DeleteCategoryService(category._id);
    GetAllCategory();
    // refresh page - after deleting category - It only reloaded the client and not the server.
    window.location.reload();
  
  };

   //update category
   const handleUpdate = async (e) => {
    e.preventDefault();

        UpdateCategoryService(selected,updatedName,updatedSlug,updatedDescription);
        setUpdatedName("");
        setUpdatedSlug("");
        setUpdatedDescription("");
        setOpen(false);
        setSelected(null);
        GetAllCategory();
        // refresh page - after deleting category - It only reloaded the client and not the server.
    window.location.reload();}
 

  useEffect(() => {
    // function call GetAllCategory()
    GetAllCategory();
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
         placeholder="Search Category Item By Name"
         onChange={(e) =>{setSearchdata(e.target.value)}}
         defaultValue={searchParams?.searchTerm?.toString()}
        name="searchTerm"
         />
      <MDBBtn rippleColor='dark'>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
   
    {/*****SEarch area End */} 

     <h3 className="text-center" style={{marginBottom:40, marginTop:20}}>Edit/Delete Table Category</h3>
   </div>

  <div style={{marginBottom:20}} >

  {/*************  table area block Begining ****************** */}
  <span>
  {/*** SearchData block ********/}
  {searchdata ? ( <div className="table-responsive" style={{overflowY:'scroll', maxHeight:'80vh', overflowX:'scroll'}}>
        <table className="table table-responsive" style={{borderRadius:10}}>
          <thead className="table-dark" style={{position:'sticky', top:0}}>
            <tr>
            <th scope="col" className="text-center">Id</th>
              <th scope="col" className="text-center">Name</th>
              <th scope="col" className="text-center">Slug</th>
              <th scope="col" className="text-center">Description</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/***if there are categories - show table */}
            {categories.filter((category) => {
            if (searchdata == null) {
                return category
            } else if (category.name.toLowerCase().includes(searchdata.toLowerCase())) {
                return category
            }
        }).map((category) => (
              <tr key={category._id}>
                <td className="text-center">{category._id}</td>
                <td className="text-center">{category.name}</td>
                <td className="text-center">{category.slug}</td>
                <td className="text-center">{category.description}</td>
                <td className="text-center">
                  
                <button className="btn btn-primary m-2" onClick={() => { setOpen(true); setUpdatedName(category.name); setUpdatedSlug(category.slug); setUpdatedDescription(category.description);setSelected(category) }}>Edit</button>
                  <button className="btn btn-danger ms-2" onClick={() =>{setSelected(category), deleteCategory(category)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
  
  /*** No SearchData block ********/
  : (<div className="table-responsive" style={{overflowY:'scroll', maxHeight:'80vh', overflowX:'scroll'}}>
  <table className="table table-responsive" style={{borderRadius:10}}>
    <thead className="table-dark" style={{position:'sticky', top:0}}>
      <tr>
      <th scope="col" className="text-center">Id</th>
        <th scope="col" className="text-center">Name</th>
        <th scope="col" className="text-center">Slug</th>
        <th scope="col" className="text-center">Description</th>
        <th scope="col" className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {/***if there are categories - show table */}
      {(categories).map((category) => (
        <tr key={category._id}>
          <td className="text-center">{category._id}</td>
          <td className="text-center">{category.name}</td>
          <td className="text-center">{category.slug}</td>
          <td className="text-center">{category.description}</td>
          <td className="text-center">
            
          <button className="btn btn-primary m-2" onClick={() => { setOpen(true); setUpdatedName(category.name); setUpdatedSlug(category.slug); setUpdatedDescription(category.description);setSelected(category) }}>Edit</button>

            <button className="btn btn-danger ms-2" onClick={() =>{setSelected(category), deleteCategory(category)}}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
)}
                                    
  </span>
</div>

{/************************************************************** */}

<Modal onCancel={() => setOpen(false)} open={open} footer={null} style={{background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)',minWidth:'50vw', minHeight:90 ,padding:30}}>
  
                 {/*** CENTER RECTANGULO STYLES */}
  
                 <div>
                  <h4 style={{textAlign:'center', marginBottom:20}}>Category - Update</h4>
                 </div>

                <form onSubmit={handleUpdate} >

                  <div className="mb-3">
                    <label for ='name'/>Name:
                    <input type="text" name='name' className="form-control" placeholder='Enter new category' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/>
                    <label for ='slug'/>Slug:
                    <input name='slug' type="text" className="form-control" placeholder='Enter slug' value={updatedSlug} onChange={(e) => setUpdatedSlug(e.target.value)}/>
                    <label for ='description'>Description:
                    <input name='description' type="text" className="form-control" placeholder='Enter Category Description' value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                    </label>


                  
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                
                </form>
                
                </Modal>
</div> 
</div>

            </div>
     </>

)}

export default EditDelCategoryArea;