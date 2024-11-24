import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to T-Shirt Haven</h1>
          <p>
            Explore the best t-shirts for every occasion. Comfortable, stylish,
            and affordable!
          </p>
          <Link to="/shop" className="cta-button">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-tshirt.jpg" alt="T-Shirts" />
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

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Don't Miss Out!</h2>
        <p>Sign up for our newsletter and get 10% off your first order.</p>
        <form className="cta-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
