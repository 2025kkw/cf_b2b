/**
 * Home Page
 * Displays company introduction and featured products
 * MODIFIED: Swapped Hero & Products position, Updated Hydraulic Industry Copy
 */

import { createLayout } from './layout';

export async function homePage(env) {
  // Load settings from KV for SEO
  let settings = {
    site_name: 'Hydroservo Intelligent Equipment',
    site_description: 'Your trusted partner for high-performance hydraulic servo equipment and industrial fluid power solutions worldwide',
    company_intro: 'We are a leading manufacturer and supplier of hydraulic servo systems and intelligent industrial equipment. With years of technical accumulation in the hydraulic industry, we serve clients across the globe with reliable solutions and exceptional customer service.'
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
    <!-- 【已调换：1. 特色产品区域现在在最顶部】 -->
    <!-- Featured Products -->
    <section class="container" style="margin-top: 3rem; margin-bottom: 3rem;">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Featured Hydraulic Products</h2>
      <div id="featured-products" class="grid grid-3">
        <div class="spinner"></div>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <a href="/products" class="btn btn-primary">View All Products</a>
      </div>
    </section>

    <!-- 【已调换：2. 宣传语区域现在在产品下面】 -->
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Welcome to Hydroservo Intelligent Equipment Co., Ltd.</h1>
        <p id="hero-subtitle">Professional Manufacturer of Hydraulic Servo Systems & Intelligent Fluid Power Solutions</p>
        <div style="margin-top: 2rem;">
          <a href="/products" class="btn btn-primary hide-on-mobile" style="margin-right: 1rem;">Browse Products</a>
          <a href="/contact" class="btn btn-secondary">Contact Us</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .hide-on-mobile {
          display: none !important;
        }
      }
    </style>

    <!-- Company Introduction -->
    <section class="container" style="margin-top: 3rem;">
      <div style="text-align: center; max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary-color);">About Our Company</h2>
        <p id="company-intro" style="color: var(--text-light); font-size: 1.1rem; line-height: 1.8;">
          Hydroservo Intelligent Equipment Co., Ltd. is a leading professional manufacturer of hydraulic servo equipment and intelligent fluid power systems. 
          With years of technical accumulation in the hydraulic industry, we serve clients across the globe with reliable, efficient and cost-effective hydraulic solutions.
        </p>
      </div>
    </section>

    <!-- Company Features -->
    <section class="container" style="margin-top: 3rem;">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem; color: var(--primary-color);">Why Choose Us</h2>
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
