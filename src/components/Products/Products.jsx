import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getProducts } from "../../services/apiServices";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import products from "../../db/dbProducts.json";
import "./Products.scss";

const Products = ({
  productsStatic,
  setProducts,
  products,
  addProductCart,
}) => {
  const [searchWord, setSearchWord] = useState("");

  console.log(productsStatic);

  useEffect(() => {
    filtrar();
  }, [searchWord]);

  const filtrar = () => {
    let resultadosBusqueda = productsStatic.filter((elemento) => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(searchWord.toLowerCase())
      ) {
        return elemento;
      }
    });
    setProducts(resultadosBusqueda);
  };

  const handleInputChange = ({ target }) => {
    setSearchWord(target.value);
  };

  return (
    <Container className="product__container">
      <input
        type="text"
        name="buscador"
        placeholder="Buscar producto..."
        value={searchWord}
        onChange={handleInputChange}
      ></input>
      <Row>
        {!products.length ? (
          <Loading />
        ) : (
          products.map((product) => (
            <Product
              key={`product_${product.id}`}
              product={product}
              addProductCart={addProductCart}
            />
          ))
        )}
      </Row>
    </Container>
  );
};

export default Products;
