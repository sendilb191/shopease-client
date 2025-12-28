import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🛒 ShopEase
      </Link>
      <div className="navbar-links">
        <Link to="/">Products</Link>
        <Link to="/add-product" className="btn-add-product">
          ➕ Add Product
        </Link>
        {user ? (
          <div className="user-menu">
            <span className="user-name">👤 {user.name}</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
