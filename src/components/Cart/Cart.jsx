import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as EmptyCart } from "../../assets/images/cart-empty.svg";
import { ReactComponent as FullCart } from "../../assets/images/cart-full.svg";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { ReactComponent as Garbage } from "../../assets/images/garbage.svg";
import { STORAGE_PRODUCTS_CART } from "../../utils/constants";
import {
  countDuplicatesItemArray,
  removeArrayDuplicates,
  removeItemArray,
} from "../../utils/arrayFunc";
import "./Cart.scss";
import { toast } from "react-toastify";

const Cart = (props) => {
  const { products, productsCart, getProductsCart } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? 400 : 0;
  const [singleProductsCart, setSingleProductsCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingleProductsCart(allProductsId);
    setCartTotalPrice(calculateTotalPrice());
    setCartLength(productsCart.lenght);
  }, [productsCart]);

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART);
    getProductsCart();
  };

  const increaseQuantity = (id, name) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart);
    getProductsCart();
  };

  const decreaseQuantity = (id, name) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CART, result);
    getProductsCart();
  };

  const calculateTotalPrice = () => {
    if (!products.loading || products.result) {
      const total = products
        .filter((product) => {
          return productsCart.includes(product.id.toString());
        })
        .reduce((totalPrice, product) => {
          const quantity = countDuplicatesItemArray(product.id, productsCart);
          return totalPrice + product.price * quantity;
        }, 0);
      return total;
    }
  };

  return (
    <>
      <Button onClick={openCart} variant="link" className="cart">
        {productsCart.length ? (
          <>
            <FullCart />
            <p className="cart-qty">{cartLength}</p>
          </>
        ) : (
          <EmptyCart />
        )}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        <div className="cart-content__products">
          {singleProductsCart.map((productId) => (
            <CartContentProduct
              key={productId}
              productId={productId}
              products={products}
              productsCart={productsCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>
    </>
  );
};

export default Cart;

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito</h2>
      </div>
      <Button onClick={emptyCart} variant="link">
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProduct(props) {
  const {
    productId,
    products: { loading, result },
    productsCart,
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    // eslint-disable-next-line
    return result.data.map((product, index) => {
      if (parseInt(productId) === product.id) {
        const quantity = countDuplicatesItemArray(product.id, productsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        );
      }
    });
  }
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;
  return (
    <div className="cart-content__product">
      <img src={`/${product.image}`} alt={product.name} />
      <div className="cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} $/ud.</p>
        </div>
        <div>
          <p>{quantity} productos</p>
          <div>
            <button onClick={() => decreaseQuantity(product.id, product.name)}>
              -
            </button>
            <button onClick={() => increaseQuantity(product.id, product.name)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>{cartTotalPrice && cartTotalPrice.toFixed(2)} $</p>
      </div>
      <Button>Pedir</Button>
    </div>
  );
}
