import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    navigate("/Checkout");
  };
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="row container-fluid">
      <div className="col-sm-8">
        <h5 className="align-left d-flex p-3">Pickup and Delivery Options</h5>
        <div className="align-left d-flex">
          <Button
            className="m-2"
            variant="outlined"
            color="success"
            size="small"
          >
            Ship
          </Button>
          <Button
            className="m-2"
            variant="outlined"
            color="success"
            size="small"
          >
            Pickup
          </Button>
          <Button
            className="m-2"
            variant="outlined"
            color="success"
            size="small"
          >
            One day Delivery
          </Button>
        </div>
        <h6 className="align-left d-flex p-3">Laptop Bag</h6>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item d-flex">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
                style={styles.productImage}
              />
              <div className="cart-item-details p-3">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <select
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <div className="cart-item-options  p-1">
                  <label htmlFor={`color-${item.id}`}>Color :</label>
                  <select id={`color-${item.id}`}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    {/* Add more colors as needed */}
                  </select>
                </div>

                <div className="cart-item-actions">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 m-2"
                      startIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      endIcon={<FavoriteIcon />}
                      className="p-2 m-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Add to Wishlist
                    </Button>
                  </Stack>
                </div>

                <p className="cart-item-price">
                  <b>Price: ${(item.price * item.quantity).toFixed(2)}</b>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {cart.length === 0 ? (
        <p></p>
      ) : (
        <div className="col-sm-4">
          <h6 className="mt-3">Order Summery</h6>
          <p>MRP : {subtotal}</p>
          <p>Shipping : Free</p>
          <p>Tax: 8%</p>
          <p>
            <strong>Estimated Total: {subtotal}</strong>
          </p>
          <p>
            <Button
              variant="outlined"
              color="success"
              size="small"
              endIcon={<ReceiptLongIcon />}
              className="p-2 m-2"
              onClick={() => handleCheckoutClick()}
            >
              Checkout
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};
const styles = {
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    width: "25%",
  },
  productCard: {
    width: "220px",
    margin: "0 auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "30px",
  },
};

export default Cart;
