import { useEffect, useState } from "react";
import '../pagesStylesheet/Cart.css';
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";

const Cart = () => {
    const {products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount} = useAppContext();
    
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [seletedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");
    const getCart = ()=>{
        let tempArray =[];
        for(const key in cartItems){
            const product = products.find((item)=>item._id === key);
            product.quantity = cartItems[key];
            tempArray.push(product);
        }
        setCartArray(tempArray);
    }

    const placeOrder = async()=>{

    }

    useEffect(()=>{
        if(products.length > 0 && cartItems){
            getCart();
        }
    }, [products,  cartItems])

    return products.length > 0 && cartItems ? (
        <div className="cart-container">
            <div className='cart-products-section'>
                <h1 className="cart-title">
                    Shopping Cart <span className="cart-items-count">{getCartCount()} Items</span>
                </h1>

                <div className="cart-columns-header">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="cart-product-row">
                        <div className="product-info-cart">
                            <div onClick={()=> {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)
                            }} className="product-image-cart">
                                <img className="image" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="product-name">{product.name}</p>
                                <div className="product-meta">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='qty-selector'>
                                        <p>Qty:</p>
                                        <select onChange={e => updateCartItem(product._id, Number(e.target.value))} 
                                         value={cartItems[product._id]} className='qty-dropdown'>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={()=> removeFromCart()} className="remove-btn">
                            <i className="ri-close-line"></i>  
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate("/products"); scrollTo(0,0)}} className="continue-shopping">
                    <i className="ri-arrow-left-line"></i>
                    Continue Shopping
                </button>

            </div>

            <div className="order-summary-section">
                <h2 className="summary-title">Order Summary</h2>
                <hr className="divider" />

                <div className="address-section">
                    <p className="section-title">Delivery Address</p>
                    <div className="address-box">
                        <p className="address-text">{seletedAddress ? `${seletedAddress.street}, ${seletedAddress.city}, ${seletedAddress.state}, ${seletedAddress.country}` :"No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="change-address">Change</button>
                        {showAddress && (
                            <div className="dropdown-address">
                                { addresses.map((address, index)=>(
                                    <p onClick={() => {setSelectedAddress(address) ;setShowAddress(false)}} className="address-option">
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => navigate("/add-address")} className="add-address">Add address</p>
                            </div>
                        )}
                    </div>

                    <p className="section-title">Payment Method</p>
                    <select onChange={e=> setPaymentOption(e.target.value)} className="payment-select">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="divider" />

                <div className="summary-details">
                    <p className="summary-item">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="summary-item">
                        <span>Shipping Fee</span><span className="free-shipping">Free</span>
                    </p>
                    <p className="summary-item">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount()*2 / 100}</span>
                    </p>
                    <p className="summary-total">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount()*2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="place-order-btn">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ): null
}

export default Cart;