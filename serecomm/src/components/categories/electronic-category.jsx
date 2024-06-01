import React,{useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
// internal
import ErrorMsg from '../common/error-msg';
import { useGetProductTypeCategoryQuery } from '@/redux/features/categoryApi';
import { GetAllCategoryService } from '../adminDashboard/category/getAllCategoryService';
import Link from "next/link";
import CategoryPage from '@/pages/shop-category';


import HomeCateLoader from '../loader/home/home-cate-loader';

const ElectronicCategory = () => {
  //const { data: categories, isLoading, isError } = useGetProductTypeCategoryQuery('electronics');
       // local const handle with useState hook
       const [categories, setCategories] = useState([]);
       const [selected, setSelected] = useState(null);
       const [name, setName] = useState('');
       const [isLoading, setIsLoading]= useState(null)


 //const { data: categories, isLoading, isError } = GetAllCategoryService(setProducts);

 // get all categories from backend
 const GetAllCategory =  () => { GetAllCategoryService(setCategories); };
  
  const router = useRouter()

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <HomeCateLoader loading={isLoading} />
    );
  }
  if (categories) {

    content = categories.map((item) => (
      
      //alert('Estoy en handle category route: ' + categories),

     
      <div className="col" key={item._id}>
        <div className="tp-product-category-item text-center mb-40">
          <div className="tp-product-category-thumb fix">
          {/****** link de la imagen category  *****/}  
          <Link href={{pathname:'/shop-category',query:{name:(item.name)}}}>
              <img src={item.imgURL} alt="product-category" width={76} height={98} />
          </Link>
          </div>
          <div className="tp-product-category-content">
            <h3 className="tp-product-category-title">
             {/****** link label slug category  *****/} 
              <Link href={{pathname:'/shop-category',query:{name:/*JSON.stringify*/(item.name)}}}>
              {item.slug}
              </Link>

            </h3>
            <p>{item?.name} -  Category</p>
          </div>
        </div>
    </div>
    ))}
  //}

  useEffect(() => {
    // function call GetAllCategory()
    GetAllCategory();
  }, []);


  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
        {content}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;