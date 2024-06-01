'use client'

import React,{ useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';
import { useSearchParams } from 'next/navigation';
import { HomePrdLoader } from '@/components/loader';
import { GetAllProductService } from '@/components/adminDashboard/product/getAllProductService';
import ProductItem from '@/components/products/electronics/product-item';

const CategoryPage = () => {

  const searchParams = useSearchParams()
  // to get the name parameter from url
  const CategoryName = searchParams.get('name');

  // const to handle the loader animation
  const [isLoading, setIsLoading] = useState(false);

  // local const handle with useState hook
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // get all products from backend
  const GetAllProduct =  () => { GetAllProductService(setProducts); };

  // decide what to render
  let content = null;

  // function to call the loader
  if (isLoading) {
    content = (
      <HomePrdLoader loading={isLoading}/>
    );}

    useEffect(() => {
      // function call GetAllProduct()
      GetAllProduct();
  }, []);
  
  // function to filter products depending on products categories
  if (products) {

    content = products.filter((Product) => {

     // return Product

      if (CategoryName == null) {
       // alert('EStoy en shop-category - line 61 - CategoryName == null');
          return Product} else if 
          
          (Product.category.toLowerCase().includes(CategoryName.toLowerCase())) {
         //   alert('Estoy en la linea - 65 - categoryName: '+ CategoryName); 
            
            return Product
          }
      
      
      }).map((Product,i) => (
      
   
      <div key={i}  style={{margin:20}}>
        <ProductItem product={Product}/>  
      </div>

    ))};


  return (
    <div>
   <Wrapper>
      <SEO pageTitle="Shop Category" />
      <HeaderTwo style_2={true}/>
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey'}}>
      <ShopBreadcrumb title="Only Categories" subtitle="Only Categories" />
      </div>
     {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>  */}
     <div  style={{border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)',display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
      
      {content}
      </div>
      <Footer primary_style={true} />
   </Wrapper>
   </div>
  );
};

export default CategoryPage;