import axios from 'axios';

export const UpdateCategoryService = async (selected,/*updatedName,updatedSlug,updatedDescription*/data) => {

  // to test
  alert('Estoy en handleUpdate - line 6 - selected._id:'+selected._id);
  alert('process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/edit/${selected._id}:'+ `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/edit/${selected._id}`);


  try {
    // update category with axios action PUT to local const res
    /*const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/edit/${selected._id}`, { name: updatedName, slug : updatedSlug, description: updatedDescription }, // data to update
  )*/



  const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/edit/${selected._id}`, data) // data to update

    // if got data successfully -show message: updated successfully,
    if (res.data.status=='true') {
      message.success(`${updatedName} updated successfully`);
       
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in update Category or handleUpdate func')
    }
  };