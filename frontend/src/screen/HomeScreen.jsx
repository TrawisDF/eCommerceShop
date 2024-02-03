import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title='eCommercShopTut'/>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product item={item} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
