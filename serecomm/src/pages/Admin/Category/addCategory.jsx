import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AddCategoryArea from '@/components/AdminDashboard/category/addcategory-area';


const addCategory = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Add Category" />
      <HeaderTwo style_2={true} />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey'}}>
      <CommonBreadcrumb title="Category" subtitle="Add" center={true} />
      </div>
      <AddCategoryArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};


export default addCategory;