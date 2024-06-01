import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
    // cart quantity
    const [quantity, setQuantity] = useState(0);
    // cart total
    const [ total, setTotal] = useState(0);
    // cart_products
    const { cart_products } = useSelector((state) => state.cart);

    useEffect(() => {
        // cartTotal, cartItem, comes from cart-state or backend
        const cart = cart_products.reduce((cartTotal, cartItem) => {
            const { price, orderQuantity } = cartItem;
            const itemTotal = price * orderQuantity;
            cartTotal.total += itemTotal
            cartTotal.quantity += orderQuantity

            return cartTotal;
        }, {
            total: 0,
            quantity: 0,
        })
        // update Quantity with cart.quantity state
        setQuantity(cart.quantity);
        // update total with cart.total state
        setTotal(cart.total);
    }, [cart_products]) // update information, everytime cart_products change
    return {
        quantity,
        total,
        setTotal,
    }
}

export default useCartInfo;