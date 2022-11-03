import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import products from "../../db/dbProducts.json";
import "./Products.scss";

const Products = (props) => {
  const {
    products: { result, loading, error },
    addProductCart,
  } = props;

  console.log(loading);

  return (
    <Container>
      <Row xl={6}>
        {loading && !result ? (
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
