import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const API_URL = import.meta.env.VITE_API_URL || "";

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fetch cart when user/token changes
  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0 });
    }
  }, [user, token]);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setCart({ items: [], total: 0 });
  };

  // Helper to make authenticated API calls
  const authFetch = async (url, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  const userId = user?.id || "guest";

  const fetchCart = async () => {
    try {
      const res = await authFetch(`${API_URL}/api/cart/${userId}`);
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const res = await authFetch(`${API_URL}/api/cart/${userId}`, {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await authFetch(
        `${API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity }),
        }
      );
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await authFetch(
        `${API_URL}/api/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If not logged in, show only login/signup pages
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged in - show full app
  return (
    <div className="app">
      <Navbar
        cartCount={cart.items.reduce((sum, item) => sum + item.quantity, 0)}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} token={token} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} token={token} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
