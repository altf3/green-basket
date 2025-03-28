import { Routes, Route, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./contexts/CartContext";

import Breadcrumbs from "./components/Breadcrumbs.js";
import Productlist from "./components/Productlist.js";
import Cart from "./components/Cart.js";
import Productdetails from "./components/Productdetails.js";
import OrderSummery from "./components/OrderSummery.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Profile from "./components/Profile.js";
import Checkout from "./components/Checkout.js";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/gb.png";
import Stack from "@mui/material/Stack";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

function App() {
  const { handlemenueselect } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const [searchStr, setSearchStr] = useState("");
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("Cart value in JS" + cartCount);
  const navigate = useNavigate();

  const handleCartClick = (id) => {
    handlemenueselect("Cart", "/Cart");
    navigate("/Cart");
  };

  const handlemenueRedirection = (name, link) => {
    if (name === "About") {
      handlemenueselect(name, link);
      navigate("/About");
    } else if (name === "Contact") {
      handlemenueselect(name, link);
      navigate("/Contact");
    } else if (name === "Profile") {
      handlemenueselect(name, link);
      navigate("/Profile");
    }
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      localStorage.setItem("initialArray", JSON.stringify(response.data));
    };

    fetchProducts();
  }, []);

  const handleSearch = (str) => {
    console.log("in");
    setSearchStr(str);
    if (str === "") {
      setProducts(JSON.parse(localStorage.getItem("initialArray")));
    } else {
      let temProduct = JSON.parse(localStorage.getItem("initialArray"));
      const filteredProducts = temProduct.filter((product) =>
        product.title.toLowerCase().includes(searchStr.toLowerCase())
      );
      setProducts(filteredProducts);
      console.log(filteredProducts);
    }
  };

  const handleHomeClick = (id) => {
    navigate(`/Productlist`);
  };
  return (
    <div className="App">
      <header className="grad" style={home.header}>
        <div style={home.logo}>
          <img src={logo} alt="Logo" style={home.logoImg} />
          <h1 style={home.logoText}>
            <span style={home.title}>Green</span> Basket
          </h1>
        </div>
        <nav style={home.menu}>
          <ul style={home.menuList}>
            <li style={home.menuItem} onClick={handleHomeClick}>
              Home
            </li>

            <li
              style={home.menuItem}
              onClick={() => handlemenueRedirection("About", "/about")}
            >
              About
            </li>
            <li
              style={home.menuItem}
              onClick={() => handlemenueRedirection("Contact", "/Contact")}
            >
              Contact
            </li>
          </ul>
        </nav>
        <div style={home.actions}>
          <input
            type="text"
            placeholder="Search..."
            value={searchStr}
            style={home.searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="Profile"
              style={home.icon}
              onClick={() => handlemenueRedirection("Profile", "/Profile")}
            >
              <AccountBoxIcon />
            </IconButton>

            <IconButton
              aria-label="add to shopping cart"
              style={home.icon}
              onClick={() => handleCartClick("Cart", "/Cart")}
            >
              <AddShoppingCartIcon />
            </IconButton>

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "013px",
                  right: "0",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Stack>
        </div>
      </header>
      <div>
        <Breadcrumbs />
      </div>

      <main className="App-main">
        <Routes>
          <Route
            path="/"
            element={
              <Productlist products={products} onSearch={handleSearch} />
            }
          />
          <Route
            path="/Productlist"
            element={
              <Productlist products={products} onSearch={handleSearch} />
            }
          />
          <Route
            path="/productdetails/:id"
            element={<Productdetails products={products} />}
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/OrderSummery" element={<OrderSummery />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </main>

      <footer style={home.header}>
        <div style={home.logo}>
          <img src={logo} alt="Logo" style={home.footerImg} />
          <h1 style={home.footerText}>
            <span style={home.title}>Green</span> Basket
          </h1>
        </div>
        <h6>Copyright © 2025-2026 Green Basket Pvt Ltd</h6>
      </footer>
    </div>
  );
}
const home = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  logo: { display: "flex", alignItems: "center" },
  logoImg: { width: "50px", height: "50px", marginRight: "10px" },
  logoText: { fontSize: "24px", fontWeight: "bold", color: "#FA5053" },
  footerImg: { width: "25px", height: "25px", marginRight: "10px" },
  footerText: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#FA5053",
    alignSelf: "end",
  },
  title: { color: "#008000" },
  menu: {},
  menuList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    margin: "0 15px",
    cursor: "pointer",
    color: "#333",
    fontSize: "16px",
  },
  actions: { display: "flex", alignItems: "center", gap: "20px" },
  searchInput: {
    padding: "5px 10px",
    fontSize: "14px",
    border: "1px solid #000",
    borderRadius: "5px",
  },
  icon: { fontSize: "20px", cursor: "pointer", color: "#008000" },
};
export default App;
