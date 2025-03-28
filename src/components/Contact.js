import React from "react";

const Contact = () => {
  return (
    <div className="container-fluid" style={cotactUs.body}>
      <h4>Contact Us</h4>
      <p>To reach our customer service team please email us.</p>
      <h6>Contact Information</h6>
      <p>
        <strong>Phone:</strong> +91-9040166135
      </p>
      <p>
        <strong>Email:</strong> support@greenbasket.com
      </p>
      <p>
        <strong>Address:</strong> #98 Green Basket store, jajpur town, Odisha, India
      </p>
    </div>
  );
};
const cotactUs = {
  body: {
    textAlign: "left",
  },
}
export default Contact;
