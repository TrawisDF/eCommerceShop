import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import RatingStar from "./RatingStar";

const Product = ({ item }) => {
  return (
    <Card className="p-3 my-3 rounded">
      <Link to={`/product/${item._id}`}>
        <Card.Img src={item.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${item._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{item.name}</strong>
          </Card.Title>
        </Link>
		<RatingStar item={item}/>
        <Card.Text as="h3" className="mt-1">${item.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
