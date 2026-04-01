/**
 * Home Page
 * Mobile Features Grid Fixed (2x2 Layout)
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
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Welcome to HydraServo Intelligent Equipment Co., Ltd.</h1>
        <p id="hero-subtitle">Professional Manufacturer of Hydraulic Servo Systems & Intelligent Fluid Power Solutions</p>
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

    <!-- Company Features - Mobile 2x2 Grid Fixed -->
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

    <!-- Optimized Styles -->
    <style>
      /* Hero Section */
      .hero h1 {
        font-size: clamp(1.5rem, 5vw, 3rem) !important;
        line-height: 1.3 !important;
        margin-bottom: 1rem !important;
      }
      .hero p {
        font-size: clamp(0.95rem, 3vw, 1.25rem) !important;
        line-height: 1.6 !important;
        margin-bottom: 1.5rem !important;
      }
      .hero-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
      .hero-buttons .btn {
        width: 100%;
        max-width: 260px;
        text-align: center;
        padding: 0.875rem 1.5rem;
      }

      /* General Spacing */
      .section-spacing {
        margin-top: 2.5rem !important;
        margin-bottom: 2.5rem !important;
        padding: 0 1rem;
      }
      .intro-container {
        text-align: center;
        max-width: 100%;
      }

      /* Product Grid */
      @media (max-width: 768px) {
        .grid-3 {
          grid-template-columns: 1fr 1fr !important;
          gap: 1rem !important;
        }
        .card-image { height: 150px !important; }
      }
      @media (max-width: 480px) {
        .grid-3 { grid-template-columns: 1fr !important; }
        .hero-buttons .btn { max-width: 100%; }
      }

      /* --- 核心修改：Features 2x2 网格布局 --- */
      .features-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 默认电脑端4列 */
        gap: 1.5rem;
      }

      @media (max-width: 900px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr); /* 平板/手机端：强制2列 */
          gap: 1rem;
        }
        .features-grid .card {
          margin-bottom: 0;
        }
        .features-grid .card-content {
          padding: 1.25rem;
        }
        .features-grid .card-title {
          font-size: 1rem !important;
          margin-bottom: 0.5rem;
        }
        .features-grid .card-description {
          font-size: 0.85rem !important;
          line-height: 1.4;
        }
      }

      @media (max-width: 480px) {
        .features-grid {
          gap: 0.75rem;
        }
        .features-grid .card-content {
          padding: 1rem;
        }
      }

      /* Product Card Description */
      .card-description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5;
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
