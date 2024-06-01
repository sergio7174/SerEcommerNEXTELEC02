import axios from 'axios';
import { notifyError, notifySuccess } from '@/utils/toast';

export const DeleteCategoryService = async (selected_id) => {

   alert('Estoy en deleteCategoryService - line 7 - selected_id: '+selected_id);
   alert(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/delete/${selected_id}`);         

    try {
        // delete category using axios action DELETE to local const res
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/delete/${selected_id}`);
        // if action is successfull, show message: deleted successfully;

        //alert('res.data.status:'+res.data.status) - LINE ONLY TO TEST RES

        if (res.data.status=='true') {
          notifySuccess(`${res.data.data.name} deleted successfully`)
        
        } else {
          notifyError(res.data.message);
        }
      } catch (error) {
       
        //notifyError('Something went wrong in delete category func')
      }
  };