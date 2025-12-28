import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProductDetail({ addToCart, token }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id, token]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setQuantity(1);
  };

  if (loading) {
    return <div className="container loading">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link
        to="/"
        className="btn btn-secondary"
        style={{ marginBottom: "1rem" }}
      >
        ← Back to Products
      </Link>
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <p className="stock">
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : "✗ Out of Stock"}
          </p>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
