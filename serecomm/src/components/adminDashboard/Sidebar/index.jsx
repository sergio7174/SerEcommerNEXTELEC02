import Link from "next/link";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import * as Styled from "./styles";

import ReactIcon from "../icons/react";
/***Icon for review option ******/
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
/***Icon for categorie option ******/
import CategoryIcon from '@mui/icons-material/Category';
/***Icon for Order option ******/
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
/***Icon for Brands option ******/
import BookmarksIcon from '@mui/icons-material/Bookmarks';
/***Icon for Admin option ******/
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
/***Icon for Users option ******/
import FaceIcon from '@mui/icons-material/Face';
/***Icon for Coupon option ******/
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
/***Icon for Products option ******/
import AssignmentIcon from '@mui/icons-material/Assignment';

import avatar from "../icons/profile.jpg";

import SubMenu from "./SidebarSubMenu";
//import MenuItem from "./SidebarMenuItem";
//import SidebarMenuAction from "./SidebarMenuAction";
import SubItem from "./SubItem";
import SidebarProvider from "../contexts/sidebarContext";

function Sidebar() {
  return (
    <SidebarProvider>
      <Styled.Sidebar>
        {/** Check its not working ...... <SidebarMenuAction/> */}
       {/* <SidebarMenuAction/>*/}
        <div style={{marginBottom:15, position:'relative', left:22}}> 
      <SidebarHeader icon={<ReactIcon/>}></SidebarHeader>
        </div>
        <ul>
          {/***** option 1 */}
          
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Review</h4>
          
          <SubMenu icon={<ZoomOutIcon/>} label={"Review"}>
          
            <SubItem><Link href="/Admin/Review/addReview">Add</Link></SubItem>
            <SubItem><Link href="/Admin/Review/editdelReview">edit/del</Link></SubItem>
          </SubMenu>
          {/***** option 2 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Category</h4>
          <SubMenu icon={<CategoryIcon />} label={"Category"}>
            <SubItem><Link href="/Admin/Category/addCategory">Add</Link></SubItem>
            <SubItem><Link href="/Admin/Category/editdelCategory">edit/del</Link></SubItem>
          </SubMenu>
          {/***** option 3 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Order</h4>
          <SubMenu icon={<ContentPasteGoIcon />} label={"Order"}>
           
            <SubItem><Link href="/editdelOrder">edit/del</Link></SubItem>
          </SubMenu>

          {/***** option 4 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Brands</h4>
          <SubMenu icon={<BookmarksIcon />} label={"Brands"}>
            <SubItem>Add</SubItem>
            <SubItem>edit/del</SubItem>
          </SubMenu>
           
           {/***** option 5 */}
           <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Admin</h4>
          <SubMenu icon={<FaceRetouchingNaturalIcon />} label={"Admin"}>
            <SubItem>Add</SubItem>
            <SubItem>edit/del</SubItem>
          </SubMenu>

          {/***** option 6 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Users</h4>
          <SubMenu icon={<FaceIcon />} label={"Users"}>
            <SubItem>edit/del</SubItem>
          </SubMenu>

          {/***** option 7 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Coupon</h4>
          <SubMenu icon={<AppShortcutIcon />} label={"Coupon"}>
            <SubItem>Add</SubItem>
            <SubItem>edit/del</SubItem>
          </SubMenu>

          {/***** option 8 */}
          <h4 style={{color:'white', fontSize:13, display:'flex', alignContent:'center', justifyContent:'center', marginBottom:-15, fontFamily:'sans-serif', color:'#007FFF'}}>Products</h4>
          <SubMenu icon={<AssignmentIcon/>} label={"Products"}>
            <SubItem><Link href="/Admin/product/addProduct">Add</Link></SubItem>
            <SubItem><Link href="/Admin/product/editdelProduct">edit/del</Link></SubItem>
          </SubMenu>

         
         
        </ul>
        
        <SidebarFooter avatar={avatar} username={"Admin XPTO"} email={"admin@xpto.com"} />
        
      </Styled.Sidebar>
    </SidebarProvider>
  );
}

export default Sidebar;
