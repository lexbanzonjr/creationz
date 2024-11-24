import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content"></div>
        <div className="hero-image">
          <img src="/banner.jpg" alt="T-Shirts" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured T-Shirts</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src="/images/classic-tee.jpg" alt="Classic Tee" />
            <h3>Classic Tee</h3>
            <p>$19.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/images/vneck-tee.jpg" alt="V-Neck Tee" />
            <h3>V-Neck Tee</h3>
            <p>$21.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="/images/graphic-tee.jpg" alt="Graphic Tee" />
            <h3>Graphic Tee</h3>
            <p>$24.99</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
