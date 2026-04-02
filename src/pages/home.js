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

    <!-- Core Optimization Styles -->
    <style>
      /* --- 核心修复：Hero区域拉宽、减少换行 --- */
      .hero {
        padding: 4rem 0;
      }
      .hero-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem; /* 手机端左右仅留1rem边距，最大化文字宽度 */
        text-align: center;
      }

      /* 标题优化：强制不拆分单词、自动适配字号、减少换行 */
      .hero h1 {
        font-size: clamp(1.4rem, 5.5vw, 3rem) !important; /* 手机端自动缩小，电脑端放大 */
        line-height: 1.35 !important;
        margin-bottom: 1.25rem !important;
        word-wrap: normal;
        word-break: keep-all; /* 禁止拆分单词，整词换行 */
        white-space: normal;
        width: 100%;
        letter-spacing: -0.02em; /* 稍微收紧字母，减少换行次数 */
      }

      /* 副标题优化 */
      .hero p {
        font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
        line-height: 1.6 !important;
        margin-bottom: 2rem !important;
        word-wrap: normal;
        word-break: keep-all;
        max-width: 90%;
        margin-left: auto;
        margin-right: auto;
      }

      /* 按钮优化 */
      .hero-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
      .hero-buttons .btn {
        padding: 0.875rem 2rem;
        font-size: 1.05rem;
        min-width: 160px;
        text-align: center;
      }

      /* 平板/手机端额外优化 */
      @media (max-width: 768px) {
        .hero {
          padding: 3rem 0;
        }
        .hero-container {
          padding: 0 0.75rem; /* 进一步缩小边距，拉宽文字 */
        }
        .hero h1 {
          letter-spacing: -0.03em;
        }
        .hero p {
          max-width: 100%;
        }
        .hero-buttons {
          flex-direction: column;
          width: 100%;
        }
        .hero-buttons .btn {
          width: 100%;
          max-width: 280px;
        }
      }

      /* 其他区域通用优化 */
      .section-spacing {
        margin-top: 2.5rem !important;
        margin-bottom: 2.5rem !important;
        padding: 0 1rem;
      }
      .intro-container {
        text-align: center;
        max-width: 900px;
        margin: 0 auto;
      }

      /* 产品网格适配 */
      @media (max-width: 768px) {
        .grid-3 {
          grid-template-columns: 1fr 1fr !important;
          gap: 1rem !important;
        }
        .card-image { height: 150px !important; }
      }
      @media (max-width: 480px) {
        .grid-3 { grid-template-columns: 1fr !important; }
      }

      /* 优势区域2x2网格 */
      .features-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
      @media (max-width: 900px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .features-grid .card-content {
          padding: 1.25rem;
        }
      }

      /* 卡片描述文本限制 */
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
