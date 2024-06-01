import axios from 'axios';

export const UpdateProductService = async (selected,data) => {

  // to test
 /*  alert('Estoy en updateProductService - line 15 - selected._id:'+selected._id);
   alert('process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/edit/${selected._id}:'+ `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/edit/${selected._id}`);*/


  try {

    // update Product with axios action PUT to local const res
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/edit/${selected._id}`,data)
    // if got data successfully -show message: updated successfully,
    if (res.data.status=='true') {
      message.success(`${updatedcode} updated successfully`);
       
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong in update Product or handleUpdate func')
    }
  };