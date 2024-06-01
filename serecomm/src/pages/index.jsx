import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ElectronicCategory from "@/components/categories/electronic-category";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
// show Free Delivery - Return & Refund - Member Discount - and Support 24/7 below
// product category option in home page 
import FeatureArea from "@/components/features/feature-area";
// show products by category in product area
import ProductArea from "@/components/products/electronics/product-area";
// show all products in shop-area 
import BannerArea from "@/components/banner/banner-area";
import OfferProducts from "@/components/products/electronics/offer-products";
import ProductGadgetArea from "@/components/products/electronics/product-gadget-area";
import ProductBanner from "@/components/products/electronics/product-banner";
import ProductSmArea from "@/components/products/electronics/product-sm-area";
import NewArrivals from "@/components/products/electronics/new-arrivals";
import BlogArea from "@/components/blog/electronic/blog-area";
import InstagramArea from "@/components/instagram/instagram-area";
import CtaArea from "@/components/cta/cta-area";
import Footer from "@/layout/footers/footer";

export default function Home() {
  return (
    <>
    <Wrapper>
      <SEO pageTitle='Home'/>
      <Header/>
       <HomeHeroSlider/>
       <ElectronicCategory/>
       <FeatureArea/>
       <ProductArea/>
       <BannerArea/>
       <OfferProducts/>
       <ProductGadgetArea/>
       <ProductBanner/>
       <NewArrivals/>
       <ProductSmArea/>
       <BlogArea/>
       <InstagramArea/>
       <CtaArea/>
      <Footer/> 
    </Wrapper>
   </>
  )
}