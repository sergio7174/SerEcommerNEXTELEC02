import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddProductArea from '@/components/AdminDashboard/product/addProduct-area';


const addCategory = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Add Product" />
      <HeaderTwo style_2={true} />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey'}}>
      <CommonBreadcrumb title="Product" subtitle="Add" center={true} />
      </div>
      <AddProductArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};


export default addCategory;