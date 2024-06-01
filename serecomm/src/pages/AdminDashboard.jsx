import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
/**CommonBreadcrumb - titles and sub-titles every page */
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import AdminArea from '@/components/adminDashboard/admin-area';

const AdminDashboard = () => {
  return (
    <Wrapper>
      <SEO pageTitle="AdminDashboard" />
      <HeaderTwo style_2={true} />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgba(103,162,231,1) 100%)',border:'5px double grey'}}>
      <CommonBreadcrumb title="Admin DashBoard" subtitle="Dashboard" center={true} />
      </div>
      <AdminArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default AdminDashboard;