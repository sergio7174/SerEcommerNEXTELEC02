import React,{useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// internal
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
//import ErrorMsg from '@/components/common/error-msg';
//import { useGetProductQuery } from '@/redux/features/productApi';
import ProductDetailsBreadcrumb from '@/components/breadcrumb/product-details-breadcrumb';
import ProductDetailsArea from '@/components/product-details/product-details-area';
import PrdDetailsLoader from '@/components/loader/prd-details-loader';
import { GetProductByIdService } from './getProductByIdService';

const ProductDetailsPage = (product) => {

    // const to handle the loader animation
    const [isLoading, setIsLoading] = useState(false);
    // const to handle data from backend
    const [getProduct, setGetProduct]  = useState([]);
    
const searchParams = useSearchParams();
// to get the name parameter from url
const ProductId = searchParams.get('id');

//const product = GetProductByIdService(ProductId);

// get all categories from backend
 const productData =  () => { GetProductByIdService(ProductId, setGetProduct); };

  // decide what to render
  let content = null;
  
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading}/>;
  }
  
    //content = <h2>ProductId: {ProductId}</h2>
            

  if (getProduct) {
    content =  (
      <>    
        <ProductDetailsBreadcrumb category={getProduct.category} title={getProduct.name} />
       <ProductDetailsArea productItem={getProduct}/>
      </>
    );
  }

  useEffect(() => {
    // function call GetAllCategory()
    productData();
  }, []);


  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <HeaderTwo style_2={true} />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey'}}>
      {content}
      </div>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
