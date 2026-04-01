/**
 * Home Page
 * Mobile Responsive Fixed, HydraServo Spelling Corrected, Layout Optimized
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
    <!-- Hero Section - Mobile Optimized -->
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

    <!-- Featured Products - Mobile Optimized -->
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
      <div class="grid grid-3">
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">🏆</div>
            <h3 class="card-title">Premium Quality</h3>
            <p class="card-description">
              All hydraulic products undergo strict quality control and meet international standards.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">🌍</div>
            <h3 class="card-title">Global Reach</h3>
            <p class="card-description">
              Serving hydraulic customers in over 50 countries with reliable logistics and technical support.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">💼</div>
            <h3 class="card-title">Expert Service</h3>
            <p class="card-description">
              Professional hydraulic engineering team ready to provide customized solutions for your needs.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">⚡</div>
            <h3 class="card-title">Fast Delivery</h3>
            <p class="card-description">
              Efficient supply chain management ensures quick turnaround and on-time delivery of hydraulic equipment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Responsive Fix Styles -->
    <style>
      /* Hero Section Mobile Fix */
      .hero h1 {
        font-size: clamp(1.8rem, 6vw, 3rem) !important;
        line-height: 1.3 !important;
        margin-bottom: 1rem !important;
        word-wrap: break-word;
      }

      .hero p {
        font-size: clamp(1rem, 4vw, 1.25rem) !important;
        line-height: 1.6 !important;
        margin-bottom: 1.5rem !important;
      }

      .hero-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        width: 100%;
      }

      .hero-buttons .btn {
        width: 100%;
        max-width: 280px;
        text-align: center;
        padding: 1rem 1.5rem;
        font-size: 1.1rem;
      }

      /* Section Spacing for Mobile */
      .section-spacing {
        margin-top: 2rem !important;
        margin-bottom: 2rem !important;
        padding: 0 1rem;
      }

      /* Intro Container Mobile Fix */
      .intro-container {
        text-align: center;
        max-width: 100%;
        padding: 0 1rem;
      }

      .intro-container h2 {
        font-size: clamp(1.5rem, 5vw, 2rem) !important;
      }

      .intro-container p {
        font-size: clamp(1rem, 4vw, 1.1rem) !important;
        line-height: 1.7 !important;
      }

      /* Grid Mobile Fix */
      @media (max-width: 768px) {
        .grid-3 {
          grid-template-columns: 1fr 1fr !important;
          gap: 1rem !important;
        }

        .card {
          margin-bottom: 0 !important;
        }

        .card-image {
          height: 160px !important;
        }

        .card-title {
          font-size: 1rem !important;
        }

        .card-description {
          font-size: 0.85rem !important;
        }
      }

      @media (max-width: 480px) {
        .grid-3 {
          grid-template-columns: 1fr !important;
        }

        .hero-buttons .btn {
          max-width: 100%;
        }
      }

      /* Hide on mobile removed - show both buttons */
      .hide-on-mobile {
        display: inline-block !important;
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
                <p class="card-description">\${product.description || 'High-performance hydraulic servo equipment for industrial applications'}</p>
                <a href="/products/\${product.id}" class="btn btn-primary">View Details</a>
              </div>
            </div>
          \`).join('');
        } catch (error) {
          console.error('Error loading featured products:', error);
          document.getElementById('featured-products').innerHTML =
            '<p style="text-align: center; color: var(--text-light);">Unable to load products. Please try again later.</p>';
        }
      }

      // Load and apply home page settings
      async function loadHomeSettings() {
        try {
          const response = await API.get('/settings');
          if (response.success) {
            const settings = response.data;

            // Update hero subtitle
            const heroSubtitle = document.getElementById('hero-subtitle');
            if (heroSubtitle && settings.site_description) {
              heroSubtitle.textContent = settings.site_description;
            }

            // Update company introduction
            const companyIntro = document.getElementById('company-intro');
            if (companyIntro && settings.company_intro) {
              companyIntro.textContent = settings.company_intro;
            }
          }
        } catch (error) {
          console.error('Error loading home settings:', error);
        }
      }

      loadFeaturedProducts();
      loadHomeSettings();

      // Add styles for product card description - limit to 3 lines
      const descriptionStyle = document.createElement('style');
      descriptionStyle.textContent = \`
        .card-description {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
        }
      \`;
      document.head.appendChild(descriptionStyle);
    </script>
  `;

  const html = createLayout(
    settings.site_name,
    content,
    scripts,
    settings.site_description,
    false // Don't use title suffix for home page
  );

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
