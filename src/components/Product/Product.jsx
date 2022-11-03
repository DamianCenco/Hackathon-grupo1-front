import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "./Product.scss";
import recipes from "../../db/recipes.json";
import { getRecipes } from "../../services/apiServices";

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
            <Card.Title>{product.nombre}</Card.Title>
            <Card.Text>{product.extraInfo}</Card.Text>
            <Card.Text>{product.precio.toFixed(2)} $ / Unidad</Card.Text>

            <Button onClick={() => handleShow(true)}>Ver producto</Button>
          </Card.Body>
        </Card>
      </Col>
      <ModalComponent
        show={show}
        handleClose={handleClose}
        product={product}
        addProductCart={addProductCart}
      />
    </>
  );
};

function ModalComponent(props) {
  const { show, handleClose, product, addProductCart } = props;
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      nombre: "Milanesa con Papas",
      ingredientes: [
        {
          id_ingrediente: 1,
          cant: 1,
        },
        {
          id_ingrediente: 2,
          cant: 2,
        },
        {
          id_ingrediente: 3,
          cant: 1,
        },
        {
          id_ingrediente: 4,
          cant: 4,
        },
      ],
      imagen: "",
    },
  ]);

  useEffect(() => {
    getRecipeByIngredient();
  }, []);

  function getRecipeByIngredient() {
    getRecipes(product.nombre)
      .then((res) => {
        console.log(res);
        setRecipes(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img height="300" width="300" src={product.imagen} />
        <div>
          <div>
            <p>Presentación: {product.extraInfo}</p>
            <p>Precio: ${product.precio}</p>
          </div>
          <Button
            className="mb-2"
            onClick={() => {
              addProductCart(product.id, product.nombre);
              handleClose();
            }}
          >
            Añadir al carrito
          </Button>
          <div>
            <hr />
            <h4>Recetas</h4>
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                {" "}
                <p>{recipe.nombre}</p>
                {recipe.ingredientes.map((ingrediente) => ingrediente.id)}
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Product;
