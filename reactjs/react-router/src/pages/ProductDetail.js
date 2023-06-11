import { Link, useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();
  
  return <>
    <h1>My Products Page</h1>
    <p>{params.productId}</p>
    <Link to={".."} relative="path">Back</Link>
  </>;
}

export default ProductDetailPage;
