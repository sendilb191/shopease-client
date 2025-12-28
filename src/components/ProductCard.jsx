import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
