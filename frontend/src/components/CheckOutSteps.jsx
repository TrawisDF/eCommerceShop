import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckOutSteps = ({ stage1, stage2, stage3, stage4 }) => {
  return (
    <Nav>
      {stage1 ? (
        <LinkContainer to="/login">
          <Nav.Link>Sign Up</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Sign Up</Nav.Link>
      )}
      {stage2 ? (
        <LinkContainer to="/shipping">
          <Nav.Link>Shipping</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Shipping</Nav.Link>
      )}
      {stage3 ? (
        <LinkContainer to="/payment">
          <Nav.Link>Payment</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Payment</Nav.Link>
      )}
      {stage4 ? (
        <LinkContainer to="/placeorder">
          <Nav.Link>Place Order</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Place Order</Nav.Link>
      )}
    </Nav>
  );
};

export default CheckOutSteps;
