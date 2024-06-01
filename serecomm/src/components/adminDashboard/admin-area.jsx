import React from "react";
// internal
import AdminMenuSidebar from "./admin-menu-sidebar";



const AdminArea = () => {

  return (
    <>
      <section  style={{border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)'}}>
       
        <div className="container" >
        <AdminMenuSidebar />
        
        </div>
      </section>
    </>
  );
};

export default AdminArea;