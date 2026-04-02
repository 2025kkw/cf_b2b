/**
 * Home Page
 * Hero Section Mobile Width Fixed, Spelling Corrected, Line Break Optimized
 */

import { createLayout } from './layout';

export async function homePage(env) {
  // Load settings from KV for SEO
  let settings = {
    site_name: 'HydraServo Intelligent Equipment',
    site_description: 'Your trusted partner for high-performance hydraulic servo equipment and industrial fluid power solutions worldwide',
    company_intro: 'HydraServo Intelligent Equipment Co., Ltd. is a leading professional manufacturer of hydraulic servo equipment and intelligent fluid power systems. With years of technical accumulation in the hydraulic industry, we serve clients across the globe with reliable solutions and exceptional customer service.'
  };

  try {
    const settingsJson = await env.STATIC_ASSETS.get('website_settings');
    if (settingsJson) {
      const savedSettings = JSON.parse(settingsJson);
      settings = { ...settings, ...savedSettings };
    }
  } catch (error) {
    console.error('Error loading settings for SEO:', error);
  }

  const content = `
    <!-- Hero Section - Mobile Width Fully Optimized -->
    <section class="hero">
      <div class="hero-container">
        <h1>HydraServo Intelligent Equipment</h1>
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

    <!-- Company Features - 2x2 Mobile Layout -->
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

    <!-- Enhanced Home Page Styles -->
    <style>
      /* Hero Container */
      .hero-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1.5rem;
        text-align: center;
        position: relative;
        z-index: 1;
      }

      /* Hero Title - Enhanced */
      .hero h1 {
        font-size: clamp(1.5rem, 5vw, 3.5rem) !important;
        line-height: 1.2 !important;
        margin-bottom: 1.5rem !important;
        word-wrap: normal;
        word-break: keep-all;
        white-space: normal;
        width: 100%;
        letter-spacing: -0.03em;
        font-weight: 800;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      /* Hero Subtitle - Enhanced */
      .hero p {
        font-size: clamp(1.05rem, 2.5vw, 1.35rem) !important;
        line-height: 1.7 !important;
        margin-bottom: 2.5rem !important;
        word-wrap: normal;
        word-break: keep-all;
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
        opacity: 0.95;
        font-weight: 400;
      }

      /* Hero Buttons */
      .hero-buttons {
        display: flex;
        gap: 1.25rem;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      .hero-buttons .btn {
        padding: 1rem 2.5rem;
        font-size: 1.05rem;
        min-width: 180px;
        text-align: center;
        font-weight: 700;
      }

      /* Section Spacing */
      .section-spacing {
        margin-top: 4rem !important;
        margin-bottom: 4rem !important;
        padding: 0 1.5rem;
      }

      .intro-container {
        text-align: center;
        max-width: 950px;
        margin: 0 auto;
      }

      .intro-container h2 {
        font-size: 2.25rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
        letter-spacing: -0.025em;
      }

      .intro-container p {
        font-size: 1.15rem;
        line-height: 1.85;
      }

      /* Products Section Title */
      .section-spacing h2 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        margin-bottom: 2.5rem;
      }

      /* Product Grid */
      @media (max-width: 768px) {
        .grid-3 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1.25rem !important;
        }
        .card-image { 
          height: 160px !important; 
        }
      }
      @media (max-width: 480px) {
        .grid-3 { 
          grid-template-columns: 1fr !important; 
        }
        .section-spacing h2 {
          font-size: 1.75rem;
        }
      }

      /* Features Grid */
      .features-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.75rem;
      }
      
      .features-grid .card {
        border: none;
        background: linear-gradient(145deg, var(--bg-white), var(--bg-light));
      }
      
      .features-grid .card:hover {
        background: linear-gradient(145deg, var(--bg-light), var(--bg-white));
      }
      
      .features-grid .card-content {
        padding: 2rem 1.75rem;
      }
      
      @media (max-width: 1024px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
      }
      
      @media (max-width: 640px) {
        .features-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Card Description */
      .card-description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.7;
      }

      /* Mobile Responsive for Hero */
      @media (max-width: 768px) {
        .hero {
          padding: 4.5rem 1rem;
        }
        .hero-container {
          padding: 0 1rem;
        }
        .hero-buttons {
          flex-direction: column;
          width: 100%;
        }
        .hero-buttons .btn {
          width: 100%;
          max-width: 320px;
        }
        .section-spacing {
          margin-top: 3rem !important;
          margin-bottom: 3rem !important;
        }
      }
    </style>
  `;

  const scripts = `
    <script>
      // Load featured products
      async function loadFeaturedProducts() {
        try {
          const response = await API.get('/products/featured');
          const products = response.data || [];
          const container = document.getElementById('featured-products');

          if (products.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No featured products available.</p>';
            return;
          }

          container.innerHTML = products.slice(0, 8).map(product => \`
            <div class="card">
              <img src="\${product.image_url || '/images/placeholder.jpg'}" alt="\${product.name}" class="card-image">
              <div class="card-content">
                <h3 class="card-title">\${product.name}</h3>
                <p class="card-description">\${product.description || 'High-performance hydraulic servo equipment'}</p>
                <a href="/products/\${product.id}" class="btn btn-primary">View Details</a>
              </div>
            </div>
          \`).join('');
        } catch (error) {
          console.error('Error loading featured products:', error);
          document.getElementById('featured-products').innerHTML =
            '<p style="text-align: center; color: var(--text-light);">Unable to load products.</p>';
        }
      }

      // Load and apply home page settings
      async function loadHomeSettings() {
        try {
          const response = await API.get('/settings');
          if (response.success) {
            const settings = response.data;
            const heroSubtitle = document.getElementById('hero-subtitle');
            if (heroSubtitle && settings.site_description) heroSubtitle.textContent = settings.site_description;
            const companyIntro = document.getElementById('company-intro');
            if (companyIntro && settings.company_intro) companyIntro.textContent = settings.company_intro;
          }
        } catch (error) {
          console.error('Error loading home settings:', error);
        }
      }

      loadFeaturedProducts();
      loadHomeSettings();
    </script>
  `;

  const html = createLayout(
    settings.site_name,
    content,
    scripts,
    settings.site_description,
    false
  );

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
