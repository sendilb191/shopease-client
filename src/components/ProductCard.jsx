import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="product-card">
      <div className="product-info">
        <div className="product-id">#{product.id}</div>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-date">Added: {formatDate(product.addedTime)}</div>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
