import React from "react";
import "./css/subbanner.css";

const SubBanner = ({ title }) => {
  return (
    <div className="sub-banner">
      <h2>{title}</h2>
    </div>
  );
};

export default SubBanner;