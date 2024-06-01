import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import EditDelProductArea from '@/components/adminDashboard/product/editDelProduct-area';


const editDelProduct = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Edit / Delete Product" />
      <HeaderTwo style_2={true} />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey', height:'20vh',display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
      <CommonBreadcrumb title="Product" subtitle="" center={true} />
      </div>
      <EditDelProductArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};


export default editDelProduct;