/**
 * HTML Layout Template
 * Provides common layout structure for all pages
 */

export function createLayout(title, content, additionalScripts = '', metaDescription = 'B2B Product Exhibition - High-quality industrial products and solutions', useTitleSuffix = true) {
  const pageTitle = useTitleSuffix ? `${title} - B2B Product Exhibition` : title;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metaDescription}">
  <title>${pageTitle}</title>
  <style>
    /* Main Stylesheet for B2B Website */

    :root {
      --primary-color: #3b82f6;
      --primary-dark: #2563eb;
      --primary-light: #60a5fa;
      --secondary-color: #0f172a;
      --accent-color: #06b6d4;
      --text-dark: #0f172a;
      --text-light: #64748b;
      --text-muted: #94a3b8;
      --bg-light: #f8fafc;
      --bg-white: #ffffff;
      --border-color: #e2e8f0;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --radius-sm: 0.375rem;
      --radius-md: 0.5rem;
      --radius-lg: 0.75rem;
      --radius-xl: 1rem;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
      line-height: 1.6;
      color: var(--text-dark);
      background: var(--bg-white);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Navigation */
    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .navbar:hover {
      box-shadow: var(--shadow-md);
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      text-decoration: none;
      letter-spacing: -0.025em;
      transition: transform 0.2s ease;
    }

    .logo:hover {
      transform: scale(1.02);
    }

    .nav-menu {
      display: flex;
      list-style: none;
      gap: 2.5rem;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-light);
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      position: relative;
      padding: 0.5rem 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      transition: width 0.3s ease;
      border-radius: 1px;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--primary-dark);
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    /* Mobile Menu Toggle */
    .menu-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--text-dark);
      margin: 3px 0;
      transition: 0.3s;
    }

    /* Container */
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-dark) 50%, var(--primary-color) 100%);
      color: white;
      padding: 6rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      position: relative;
      z-index: 1;
    }

    .hero p {
      font-size: 1.25rem;
      max-width: 700px;
      margin: 0 auto 2rem;
      opacity: 0.95;
      font-weight: 400;
      position: relative;
      z-index: 1;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.875rem 2rem;
      border-radius: var(--radius-lg);
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(59, 130, 246, 0.5);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .btn-secondary:active {
      transform: translateY(0);
    }

    /* Cards */
    .card {
      background: var(--bg-white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid var(--border-color);
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-light);
    }

    .card-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card:hover .card-image {
      transform: scale(1.05);
    }

    .card-content {
      padding: 1.75rem;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--text-dark);
      letter-spacing: -0.01em;
    }

    .card-description {
      color: var(--text-light);
      margin-bottom: 1.25rem;
      line-height: 1.7;
    }

    /* Grid Layout */
    .grid {
      display: grid;
      gap: 2rem;
    }

    .grid-2 {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      max-width: 100%;
    }

    .grid-3 {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      max-width: 100%;
    }

    /* Limit card max width when there are few items */
    .grid > .card {
      max-width: 400px;
      justify-self: start;
    }

    @media (min-width: 768px) {
      .grid > .card {
        justify-self: stretch;
      }
    }

    /* Form Styles */
    .form-group {
      margin-bottom: 1.75rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--text-dark);
      font-size: 0.95rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      background: var(--bg-white);
      transition: all 0.2s ease;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: var(--text-muted);
    }

    .form-textarea {
      resize: vertical;
      min-height: 140px;
    }

    /* Footer */
    .footer {
      background: linear-gradient(180deg, var(--secondary-color) 0%, #020617 100%);
      color: white;
      padding: 4rem 2rem 2rem;
      margin-top: 5rem;
      position: relative;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
    }

    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2.5rem;
    }

    .footer-section h3 {
      margin-bottom: 1.25rem;
      color: var(--accent-color);
      font-weight: 700;
      font-size: 1.1rem;
    }

    .footer-section p {
      color: #94a3b8;
      line-height: 1.8;
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section ul li {
      margin-bottom: 0.75rem;
    }

    .footer-section a {
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-section a:hover {
      color: white;
      transform: translateX(4px);
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2.5rem;
      margin-top: 3rem;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      color: #64748b;
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% {
      opacity: 1;
      }
      50% {
      opacity: 0.5;
      }
    }

    .fade-in-up {
      animation: fadeInUp 0.6s ease-out;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(12px);
        width: 100%;
        text-align: center;
        transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-lg);
        padding: 2.5rem 0;
        gap: 1.5rem;
      }

      .nav-menu.active {
        left: 0;
      }

      .menu-toggle {
        display: flex;
      }

      .hero {
        padding: 4rem 1.5rem;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1.1rem;
      }

      .grid-2,
      .grid-3 {
        grid-template-columns: 1fr;
      }

      .container {
        padding: 2rem 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .hero h1 {
        font-size: 1.75rem;
      }

      .btn {
        width: 100%;
      }

      .hero-buttons {
        flex-direction: column;
        width: 100%;
      }
    }

    /* Loading Spinner */
    .spinner {
      border: 3px solid #f3f4f6;
      border-top: 3px solid var(--primary-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 2rem auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  ${createNavbar()}

  <main>
    ${content}
  </main>

  ${createFooter()}

  <script>
    /**
     * Main JavaScript file for B2B Website
     * Handles common functionality across all pages
     */

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.nav-menu');

      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
          if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
          }
        });
      }

      // Set active nav link based on current page
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
        }
      });
    });

    // API helper functions
    const API = {
      baseURL: '/api',

      async get(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async post(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async put(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },

      async delete(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        return await response.json();
      },
    };

    // Form validation helper
    function validateEmail(email) {
      const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    // Show notification
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = \`notification notification-\${type}\`;
      notification.textContent = message;
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: \${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
      \`;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    \`;
    document.head.appendChild(style);

    // Load and apply website settings
    async function loadWebsiteSettings() {
      try {
        const response = await API.get('/settings');
        if (response.success) {
          const settings = response.data;

          // Update logo/site name
          const logo = document.querySelector('.logo');
          if (logo && settings.site_name) {
            logo.textContent = settings.site_name;
          }

          // Update footer About Us section
          const aboutSection = document.querySelector('.footer-section p');
          if (aboutSection && settings.site_description) {
            aboutSection.textContent = settings.site_description;
          }

          // Update footer Contact Info
          const contactItems = document.querySelectorAll('.footer-section:nth-child(3) ul li');
          if (contactItems.length >= 3) {
            if (settings.email) contactItems[0].textContent = \`Email: \${settings.email}\`;
            if (settings.phone) contactItems[1].textContent = \`Phone: \${settings.phone}\`;
            if (settings.address) contactItems[2].textContent = \`Address: \${settings.address}\`;
          }

          // Update social media links
          const socialLinks = document.querySelectorAll('.footer-section:nth-child(4) ul li a');
          if (socialLinks.length >= 3) {
            if (settings.linkedin) {
              socialLinks[0].href = settings.linkedin;
              if (settings.linkedin === '#') socialLinks[0].parentElement.style.display = 'none';
            }
            if (settings.facebook) {
              socialLinks[1].href = settings.facebook;
              if (settings.facebook === '#') socialLinks[1].parentElement.style.display = 'none';
            }
            if (settings.twitter) {
              socialLinks[2].href = settings.twitter;
              if (settings.twitter === '#') socialLinks[2].parentElement.style.display = 'none';
            }
          }
        }
      } catch (error) {
        console.error('Error loading website settings:', error);
      }
    }

    // Load settings on page load
    loadWebsiteSettings();

    // Export for use in other scripts
    window.API = API;
    window.validateEmail = validateEmail;
    window.showNotification = showNotification;
  </script>
  ${additionalScripts}
</body>
</html>`;
}

function createNavbar() {
  return `
  <nav class="navbar">
    <div class="nav-container">
      <a href="/" class="logo">GlobalMart</a>
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-menu">
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/products" class="nav-link">Products</a></li>
        <li><a href="/about" class="nav-link">About</a></li>
        <li><a href="/contact" class="nav-link">Contact</a></li>
      </ul>
    </div>
  </nav>`;
}

function createFooter() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>About Us</h3>
        <p>Leading provider of high-quality industrial products and solutions worldwide.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact Info</h3>
        <ul>
          <li>Email: info@example.com</li>
          <li>Phone: +1 234 567 8900</li>
          <li>Address: 123 Business St, City, Country</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="#" target="_blank">LinkedIn</a></li>
          <li><a href="#" target="_blank">Facebook</a></li>
          <li><a href="#" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} B2B Product Exhibition. All rights reserved.</p>
    </div>
  </footer>`;
}
