import React from "react";
import "./product_card.css";
import BaseLuggage from '../assets/4HzWD2k.jpeg'

function ProductCard({ title, imageUrl, body }) {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={BaseLuggage} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3> {title} </h3>
        </div>
        <div className="card-body">
          <p> {body} </p>
        </div>
        <div className="btn">
          <button>
            <a>View product</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
