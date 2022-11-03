import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import Cart from "../Cart/Cart";

import "./TopMenu.scss";

const TopMenu = (props) => {
  const { products, productsCart, getProductsCart } = props;
  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />
        <MenuNav />
        <Cart
          products={products}
          productsCart={productsCart}
          getProductsCart={getProductsCart}
        />
      </Container>
    </Navbar>
  );
};

export default TopMenu;

function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>MiSuper</h2>
    </Navbar.Brand>
  );
}

function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Mascotas</Nav.Link>
    </Nav>
  );
}
