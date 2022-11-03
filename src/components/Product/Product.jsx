import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "./Product.scss";

const Product = (props) => {
  const { product, addProductCart } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col className="product">
        <Card>
          <Card.Img variant="top" src={product.imagen} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.extraInfo}</Card.Text>
            <Card.Text>{product.precio.toFixed(2)} $ / Unidad</Card.Text>
            <Button
              className="mb-2"
              onClick={() => addProductCart(product.id, product.name)}
            >
              Añadir al carrito
            </Button>
            <Button onClick={() => handleShow(true)}>Ver producto</Button>
          </Card.Body>
        </Card>
      </Col>
      <ModalComponent show={show} handleClose={handleClose} product={product} />
    </>
  );
};

function ModalComponent(props) {
  const { show, handleClose, product } = props;
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img height="300" width="300" src={product.image} />
        <div>
          <div>
            <p>Presentación: {product.extraInfo}</p>
            <p>Precio: ${product.price}</p>
          </div>
          <div>
            <hr />
            <h3>Recetas</h3>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Product;
