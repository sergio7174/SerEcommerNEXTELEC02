import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
// react function to handle dates
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// internal
import { Cart, QuickView, Wishlist } from "@/svg";
// function to handle hours
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";

const ProductItem = ({ product, offer_style = false }) => {

  const { _id, imgURL, category, title, reviews, price, discount,status,offerDate } = product || {};

  console.log(status)
  // get cart_products from store state
  const { cart_products } = useSelector((state) => state.cart);
  // get the wishlist from store state
  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();
  
  const [ratingVal, setRatingVal] = useState(0);
  
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <>
      {/**** container of each product    ******/}
      <div
        className={`${offer_style ? "tp-product-offer-item" : "mb-25"
          } tp-product-item transition-3`} style={{border:'4px double gray'}}>
           
        {/*** image link onclick to /product-details/${_id} */}
        <div className="tp-product-thumb p-relative fix">
          
         
          {/*<Link href={{pathname:`/product-details/${_id}`,query:{id:JSON.stringify(product._id)}}} >*/}
          <Link href={{pathname:`/product-details/${_id}`,query:{id:(product._id)}}} >


           <img src={product.imgURL} style={{borderRadius:5, width:'20vw', height:'45vh'  }}/>
          
           {/****if status === out-of-stock shows a label out stock*/}
            <div className="tp-product-badge">
              {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
            </div>
          </Link>

          {/*  product action - shows three icons on image to add to cart - view and add to wishlist*/}
          <div className="tp-product-action" style={{border:'4px double black'}}>
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className={`tp-product-action-btn ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                  disabled={status === 'out-of-stock'}
                >
                  <Cart />

                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn"
              >
                <QuickView />

                <span className="tp-product-tooltip">Quick View</span>
              </button>
              <button
                type="button"
                className={`tp-product-action-btn ${isAddedToWishlist ? 'active' : ''} tp-product-add-to-wishlist-btn`}
                onClick={() => handleWishlistProduct(product)}
                disabled={status === 'out-of-stock'}
              >
                <Wishlist />
                <span className="tp-product-tooltip">Add To Wishlist</span>
              </button>
            </div>
          </div>
          {/***end of product actions block */}


        </div>
        {/*  product content */}
   
        <div className="tp-product-content" style={{textAlign:'center'}}>

          {/**** Product name block beginning */}
          <div className="tp-product-category">
            <a href="#">{product?.name}</a>
          </div>
          <h3 className="tp-product-title">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </h3>
           {/**** Product rating block beginning */}
          <div className="tp-product-rating d-flex align-items-center" style={{textAlign:'center'}}>
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
          </div>
          {/**** Product rating block End */}
            {/**** Product price block beginning */}
          <div className="tp-product-price-wrapper">
            {discount > 0 ? (
              <>
                <span className="tp-product-price old-price">${price}</span>
                <span className="tp-product-price new-price">
                  {" "} ${(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">${parseFloat(price).toFixed(2)}</span>
            )}
          </div>
           {/**** Product price block End */}

          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerDate?.endDate) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerDate?.endDate)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
   
    </>
  );
};

export default ProductItem;
