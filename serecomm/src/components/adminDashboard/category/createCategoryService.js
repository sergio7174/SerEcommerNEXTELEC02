import axios from 'axios';
import { notifyError, notifySuccess } from '@/utils/toast';

export const CreateCategory = async (data) => {

    try {
        // create-category with data from form to backend with axios and action POST, data: name, slug
        //const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}`+'/api/category/add', { name, slug, description });
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}`+'/api/category/add', data)
    
        /*alert('res.data.status:'+res.data.status) - LINE ONLY TO TEST RES DATA
        alert('res.data.message:'+res.data.message) - LINE ONLY TO TEST RES DATA
        alert('res.data.data.name:'+res.data.data.name)*/  //LINE ONLY TO TEST RES DATA

    
        // if category exits on database
        if (res.data.status=='false') {
            notifyError(`${res.data?.message}`);
        } 
         // if category doesn't exits on database
        if (res.data?.status=='true') {
            notifySuccess(`${res.data?.data.name}, category created successfully`);
        } //else {notifyError(res.data.message);}
      } catch (error) {
        console.log(error);
        notifyError('Something went wrong in form category handleSubmit')
      }
  };