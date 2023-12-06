import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductQuery } from "../slices/productApiSlice";
import Message from "./Message";
import Loader from "./Loader";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message varaint="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((item) => (
        <Carousel.Item key={item._id}>
          <Link to={`/product/${item._id}`}>
            <Image src={item.image} alt={item.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {item.name} (${item.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
