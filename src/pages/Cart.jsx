import { Link } from "react-router-dom";

function Cart({ cart, updateQuantity, removeFromCart }) {
  if (cart.items.length === 0) {
    return (
      <div className="container">
        <div className="cart-container empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet.</p>
          <Link
            to="/"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="price">${item.price.toFixed(2)} each</p>
            </div>
            <div className="cart-item-actions">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="cart-summary">
          <div className="total">
            Total: <span>${cart.total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
