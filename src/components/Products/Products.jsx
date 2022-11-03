import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import "./Products.scss";

const Products = (props) => {
  const {
    products: { result, loading, error },
    addProductCart,
  } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.data.map((product) => (
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
