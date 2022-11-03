import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getProducts } from "../../services/apiServices";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import "./Products.scss";

const Products = ({
  productsStatic,
  setProducts,
  products,
  addProductCart,
}) => {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    filtrar();
  }, [searchWord]);

  const filtrar = () => {
    let resultadosBusqueda = productsStatic.filter((elemento) => {
      if (
        elemento.name
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
    <Container>
      <input
        type="text"
        name="buscador"
        placeholder="BUSCATE ALGO"
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
