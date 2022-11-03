import { useEffect, useState } from "react";
import Products from "./components/Products/Products";
import TopMenu from "./components/TopMenu/TopMenu";
import useAxios from "./hooks/useAxios";
import { STORAGE_PRODUCTS_CART, urlApiProducts } from "./utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { getProducts } from "./services/apiServices";

function App() {
  // const products = useAxios(urlApiProducts);
  const [productsCart, setProductsCart] = useState([]);

  useEffect(() => {
    getProductsCart();
    getProductsFunction()
  }, []);

  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  const addProductCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart);
    getProductsCart();
    toast.success(`${name} añadido al carrito correctamente`);
  };


  const [products, setProducts] = useState([]);
  const [productsStatic, setProductsStatic] = useState([]);

  function getProductsFunction() {
    getProducts()
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        setProductsStatic(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <TopMenu
        products={products}
        productsCart={productsCart}
        getProductsCart={getProductsCart}
      />
      <Products
        products={products}
        productsStatic={productsStatic}
        setProducts={setProducts}
        addProductCart={addProductCart}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closesOnClick
        rtl={false}
        pauseOnHover={false}
        draggable
      />
    </div>
  );
}

export default App;
