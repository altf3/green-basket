import React from "react";

const Profile = () => {
  return (
    <div className="row container">
      <div className="col-sm-8">
      <h4>Your profle</h4>
      <h6 className="profile-name">MD Altaf</h6>
      <h6>Contact Information</h6>
      <ul>
        <li>
          <strong>Email:</strong> altaf@icloud.com
        </li>
        <li>
          <strong>Phone:</strong> +91-9040166135
        </li>
        <li>
          <strong>Location:</strong> Odisha, India
        </li>
      </ul>
      </div>
     
      <div className="col-sm-4">
        <h6>Saved Address</h6>
        <p>
          Flat No :127 ,Altaf Asiyana
          <br />
          Taramadan , Jajpur town
          <br />
          Jajpur, Odisha
          <br />
          India
          <br />
          Pin: 755001
        </p>
      </div>
    </div>
  );
};

export default Profile;
