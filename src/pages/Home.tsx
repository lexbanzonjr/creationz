import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <section>
        <img src="/banner.jpg" alt="Banner" />
      </section>

      {/* Featured Products */}
      <section>
        <h2>Featured T-Shirts</h2>

        <div>
          <div>
            <img src="/images/classic-tee.jpg" alt="Classic Tee" />
            <h3>Classic Tee</h3>
            <p>$19.99</p>
            <button>Add to Cart</button>
          </div>
          <div>
            <img src="/images/vneck-tee.jpg" alt="V-Neck Tee" />
            <h3>V-Neck Tee</h3>
            <p>$21.99</p>
            <button>Add to Cart</button>
          </div>
          <div>
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
