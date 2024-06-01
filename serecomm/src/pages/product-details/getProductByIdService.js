import axios from 'axios';
import { notifyError, notifySuccess } from '@/utils/toast';

export const GetProductByIdService = async (selected_id,setGetProduct) => {

    try {
        //  GetProductById with data from form to backend with axios and action get, data: id

        /*alert('Estoy en getProductByIdService line 9 - id: '+selected_id) //- LINE ONLY TO TEST RES DATA*/
        

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/single-product/${selected_id}`)
    
        /*alert('res.data.status:'+res.data.status) //- LINE ONLY TO TEST RES DATA
        alert('res.data.message:'+res.data.message)// - LINE ONLY TO TEST RES DATA
        alert('res.data.data.name:'+res.data.data.name)  //LINE ONLY TO TEST RES DATA*/

    
        // if product exits on database
        if (res.data.status=='false') {
            notifyError(`${res.data?.message}`);
        } 
         // if product doesn't exits on database
        if (res.data?.status=='true') {
            notifySuccess(`${res.data?.data.name}, Product Find It successfully`);
            setGetProduct(res.data.data)
        } //else {notifyError(res.data.message);}
      } catch (error) {
        console.log(error);
        notifyError('Something went wrong in Finding Product handleSubmit')
      }
  };