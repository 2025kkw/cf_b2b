/**
 * Home Page - Original Version
 */

import { createLayout } from './layout';

export async function homePage(env) {
  const content = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <h1>Welcome to HydraServo Intelligent Equipment Co., Ltd.</h1>
        <p id="hero-subtitle">Your trusted partner for high-quality industrial products and innovative solutions worldwide</p>
        <div class="hero-buttons">
          <a href="/products" class="btn btn-primary">Browse Products</a>
          <a href="/contact" class="btn btn-secondary">Contact Us</a>
        </div>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="container section-spacing">
      <div class="intro-container">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary-color);">About HydraServo</h2>
        <p id="company-intro" style="color: var(--text-light); font-size: 1.1rem; line-height: 1.8;">
          HydraServo Intelligent Equipment Co., Ltd. is a leading professional manufacturer of hydraulic servo equipment and intelligent fluid power systems. 
          With years of technical accumulation in the hydraulic industry, we serve clients across the globe with reliable, efficient and cost-effective hydraulic solutions.
        </p>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container section-spacing">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Featured Hydraulic Products</h2>
      <div id="featured-products" class="grid grid-3">
        <div class="spinner"></div>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <a href="/products" class="btn btn-primary">View All Products</a>
      </div>
    </section>

    <!-- Company Features -->
    <section class="container section-spacing">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Why Choose HydraServo</h2>
      <div class="features-grid">
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 0.75rem;">🏆</div>
            <h3 class="card-title">Premium Quality</h3>
            <p class="card-description">
              Strict quality control meets international standards.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 0.75rem;">🌍</div>
            <h3 class="card-title">Global Reach</h3>
            <p class="card-description">
              Serving customers in over 50 countries.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 0.75rem;">💼</div>
            <h3 class="card-title">Expert Service</h3>
            <p class="card-description">
              Professional team for customized solutions.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 0.75rem;">⚡</div>
            <h3 class="card-title">Fast Delivery</h3>
            <p class="card-description">
              Efficient supply chain ensures on-time delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="container section-spacing">
      <div class="contact-container">
        <h2 style="text-align: center; font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary-color);">Get In Touch</h2>
        <p style="text-align: center; color: var(--text-light); margin-bottom: 2rem; font-size: 1.1rem;">
          Ready to start your next project? Contact us today for a free consultation!
        </p>
        <div style="text-align: center;">
          <a href="/contact" class="btn btn-primary">Contact Us</a>
        </div>
      </div>
    </section>
  `;

  return createLayout(env, 'HydraServo Intelligent Equipment Co., Ltd.', content);
}
