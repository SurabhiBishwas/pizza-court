import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';

const Cart = () => {

  const { cart, setCart } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  let totalPrice = 0;

  useEffect(() => {
    if(cart.totalItems>0) {
      let products=[cartProducts];
      const getProducts = async () => {
        if(!cartProducts.length) {
          await fetch(`https://star-spark-pasta.glitch.me/api/products`)
          .then(res => res.json())
          .then(data => products=data);
        }
        setCartProducts(products.filter(product => Object.keys(cart.items).includes(product._id)));
      }
      getProducts();
    }
  }, [cart]);

  const getQuantity = (id) => {
    return cart.items[id];
  }

  const increment = (id) => {
    let _cart = {...cart};
    _cart.items[id]+=1;
    _cart.totalItems+=1;
    setCart(_cart);
  }

  const decrement = (id) => {
    let _cart = {...cart};
    if(_cart.items[id]===1) 
      delete _cart.items[id];
    else
      cart.items[id]-=1;
    _cart.totalItems-=1;
    setCart(_cart);
  }

  const getPriceSum = (id, price) => {
    totalPrice+=cart.items[id]*price;
    return cart.items[id]*price;
  }

  const deleteProduct = (id) => {
    let _cart = {...cart};
    _cart.totalItems-=_cart.items[id];
    delete _cart.items[id];
    setCart(_cart);
  }

  const order = () => {
    setCart({items:{}, totalItems: 0});
    setCartProducts([]);
    alert("Order Placed Successfully !");
  }

  return (
    !cartProducts.length ?
      <img src="images/empty-cart.png" className='mx-auto w-1/2 mt-12' alt="empty cart"/>
    :
      <div className="container mx-auto lg:w-1/2 w-full pb-24">
        <h1 className="my-12 font-bold">Cart items</h1>
        <ul>
          {
            cartProducts.map(product => {
              return(
                <li className="mb-12" key={product._id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={product.image} className="h-16" alt="pizza"/>
                      <span className="font-bold ml-4 w-48">{product.name}</span>
                    </div>
                    <div>
                      <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none" onClick={() => decrement(product._id)}>-</button>
                      <b className="px-4">{getQuantity(product._id)}</b>
                      <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none" onClick={() => increment(product._id)}>+</button>
                    </div>
                    <span>₹ {getPriceSum(product._id, product.price)}</span>
                    <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white" onClick={() => deleteProduct(product._id)}>Delete</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <hr className="my-6"/>
        <div className="text-right">
          <b>Grand Total:</b> ₹ {totalPrice}
        </div>
        <div className="text-right mt-6">
          <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none" onClick={() => order()}>Order Now</button>
        </div>
      </div>
  )
}

export default Cart
