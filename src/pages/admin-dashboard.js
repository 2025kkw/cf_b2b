/**
 * Admin Dashboard Page - Enhanced Professional Version
 * Main admin interface for managing products and inquiries
 */

import { createLayout } from './layout';

export async function adminDashboard(env) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - B2B Product Exhibition</title>
  <style>
    /* Enhanced Professional Admin Styles */

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
      background: var(--bg-light);
      -webkit-font-smoothing: antialiased;
    }

    /* Buttons - Enhanced */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-lg);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
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

    .btn-secondary {
      background: var(--accent-color);
      color: white;
      box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.3);
    }

    .btn-secondary:hover {
      background: #0891b2;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(6, 182, 212, 0.4);
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.3);
    }

    .btn-danger:hover {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(239, 68, 68, 0.4);
    }

    .btn-cancel {
      background: #64748b;
      color: white;
    }

    .btn-cancel:hover {
      background: #475569;
      transform: translateY(-2px);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    /* Admin Layout */
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }

    .admin-sidebar {
      width: 260px;
      background: linear-gradient(180deg, var(--secondary-color) 0%, #020617 100%);
      color: white;
      padding: 2rem 0;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      box-shadow: var(--shadow-xl);
    }

    .admin-sidebar-header {
      padding: 0 2rem 2rem 2rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      margin-bottom: 1.5rem;
    }

    .admin-sidebar-header h2 {
      color: var(--accent-color);
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.025em;
    }

    .admin-content {
      flex: 1;
      margin-left: 260px;
      padding: 2rem;
      background: var(--bg-light);
      min-height: 100vh;
    }

    .admin-header {
      background: var(--bg-white);
      padding: 1.5rem 2rem;
      margin: -2rem -2rem 2rem -2rem;
      box-shadow: var(--shadow-sm);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0;
    }

    .admin-header h1 {
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      margin-bottom: 0.25rem;
    }

    .sidebar-nav {
      list-style: none;
    }

    .sidebar-nav li {
      margin: 0;
    }

    .sidebar-nav a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      color: #94a3b8;
      text-decoration: none;
      transition: all 0.2s ease;
      font-weight: 500;
      border-left: 3px solid transparent;
    }

    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-left-color: var(--accent-color);
    }

    /* Enhanced Stat Cards */
    .stat-card {
      background: linear-gradient(145deg, var(--bg-white), var(--bg-light));
      padding: 2rem;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .stat-card h3 {
      color: var(--text-light);
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-card .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--primary-dark);
      letter-spacing: -0.025em;
    }

    .stat-card .stat-icon {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 3rem;
      opacity: 0.15;
    }

    /* Grid Layout */
    .grid {
      display: grid;
      gap: 1.5rem;
    }

    .grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .grid-4 {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    /* Table Styles - Enhanced */
    .table-container {
      background: var(--bg-white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th {
      background: var(--bg-light);
      padding: 1rem 1.25rem;
      text-align: left;
      font-weight: 700;
      color: var(--text-dark);
      border-bottom: 2px solid var(--border-color);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .table td {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
      vertical-align: middle;
    }

    .table tr {
      transition: background-color 0.2s ease;
    }

    .table tr:hover {
      background: var(--bg-light);
    }

    /* Badges - Enhanced */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.875rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .badge-pending {
      background: #fef3c7;
      color: #92400e;
    }

    .badge-processing {
      background: #dbeafe;
      color: #1e40af;
    }

    .badge-completed {
      background: #d1fae5;
      color: #065f46;
    }

    .badge-active {
      background: #d1fae5;
      color: #065f46;
    }

    .badge-inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    /* Tab Navigation */
    .tab-nav {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--border-color);
      background: var(--bg-white);
      padding: 0 1rem;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }

    .tab-btn {
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      color: var(--text-light);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.95rem;
    }

    .tab-btn:hover {
      color: var(--primary-color);
    }

    .tab-btn.active {
      color: var(--primary-dark);
      border-bottom-color: var(--primary-color);
    }

    .tab-content {
      display: none;
      animation: fadeIn 0.3s ease-out;
    }

    .tab-content.active {
      display: block;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Modal Styles - Enhanced */
    .modal {
      display: none;
      position: fixed;
      z-index: 10000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      overflow-y: auto;
    }

    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-content {
      background-color: var(--bg-white);
      padding: 2rem;
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--border-color);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }

    .modal-header h2 {
      font-size: 1.5rem;
      color: var(--text-dark);
      font-weight: 800;
      letter-spacing: -0.025em;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.75rem;
      cursor: pointer;
      color: var(--text-light);
      padding: 0;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      color: var(--text-dark);
      background: var(--bg-light);
    }

    /* Form Styles - Enhanced */
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--text-dark);
      font-size: 0.9rem;
    }

    .form-input,
    .form-textarea,
    .form-select {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      background: var(--bg-white);
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .form-input:focus,
    .form-textarea:focus,
    .form-select:focus {
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
      min-height: 120px;
    }

    .form-checkbox {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .form-checkbox input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 2px solid var(--border-color);
    }

    /* Image Upload */
    .image-upload-container {
      margin-bottom: 1.5rem;
    }

    .image-preview {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .image-preview img {
      max-width: 200px;
      max-height: 200px;
      border-radius: var(--radius-lg);
      border: 2px solid var(--border-color);
      object-fit: cover;
    }

    .upload-btn-wrapper {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }

    .upload-btn-wrapper input[type=file] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .btn-upload {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 0.625rem 1.25rem;
      border-radius: var(--radius-lg);
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-upload:hover {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
      transform: translateY(-2px);
      box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
    }

    .uploading {
      color: var(--primary-color);
      font-size: 0.9rem;
      margin-top: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Page Section Header */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-dark);
      letter-spacing: -0.025em;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .admin-sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }
      .admin-content {
        margin-left: 0;
      }
      .admin-layout {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .admin-content {
        padding: 1.5rem;
      }
      .admin-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      .tab-nav {
        flex-wrap: wrap;
      }
      .grid-4,
      .grid-3,
      .grid-2 {
        grid-template-columns: 1fr;
      }
      .table th,
      .table td {
        padding: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-sidebar-header">
        <h2>🎛️ B2B Admin</h2>
      </div>
      <ul class="sidebar-nav">
        <li><a href="#" data-tab="overview" class="active">📊 Overview</a></li>
        <li><a href="#" data-tab="products">📦 Products</a></li>
        <li><a href="#" data-tab="categories">🏷️ Categories</a></li>
        <li><a href="#" data-tab="inquiries">💬 Inquiries</a></li>
        <li><a href="#" data-tab="admins">👥 Admins</a></li>
        <li><a href="#" data-tab="settings">⚙️ Settings</a></li>
        <li><a href="#" id="logout-btn">🚪 Logout</a></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="admin-content">
      <div class="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p style="color: var(--text-light); font-size: 0.9rem;">
            Welcome back, <span id="admin-username" style="font-weight: 600; color: var(--text-dark);">Admin</span>
            <span id="admin-role-indicator" style="margin-left: 0.75rem; padding: 0.35rem 0.75rem; background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">Loading...</span>
          </p>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <a href="/" target="_blank" class="btn btn-primary" style="text-decoration: none;">
            👁️ Preview Site
          </a>
          <button id="logout-btn-header" class="btn btn-secondary">Logout</button>
        </div>
      </div>

      <!-- Overview Tab -->
      <div id="overview-tab" class="tab-content active">
        <div class="grid grid-4" style="margin-bottom: 2.5rem;">
          <div class="stat-card">
            <span class="stat-icon">📦</span>
            <h3>Total Products</h3>
            <div class="stat-value" id="stat-products">0</div>
          </div>
          <div class="stat-card">
            <span class="stat-icon">💬</span>
            <h3>Total Inquiries</h3>
            <div class="stat-value" id="stat-inquiries">0</div>
          </div>
          <div class="stat-card">
            <span class="stat-icon">⏳</span>
            <h3>Pending Inquiries</h3>
            <div class="stat-value" id="stat-pending">0</div>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🏷️</span>
            <h3>Categories</h3>
            <div class="stat-value" id="stat-categories">0</div>
          </div>
        </div>

        <div class="section-header">
          <h2>Recent Inquiries</h2>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="recent-inquiries-tbody">
              <tr><td colspan="5" style="text-align: center; color: var(--text-light);">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products Tab -->
      <div id="products-tab" class="tab-content">
        <div class="section-header">
          <h2>Manage Products</h2>
          <button id="add-product-btn" class="btn btn-primary">+ Add Product</button>
        </div>
        <div class="table-container">
          <div id="products-list">Loading...</div>
        </div>
      </div>

      <!-- Categories Tab (New) -->
      <div id="categories-tab" class="tab-content">
        <div class="section-header">
          <h2>Manage Categories</h2>
          <button id="add-category-btn" class="btn btn-primary">+ Add Category</button>
        </div>
        <div class="table-container">
          <div id="categories-list">Loading...</div>
        </div>
      </div>

      <!-- Inquiries Tab -->
      <div id="inquiries-tab" class="tab-content">
        <div class="section-header">
          <h2>Manage Inquiries</h2>
        </div>
        <div class="table-container">
          <div id="inquiries-list">Loading...</div>
        </div>
      </div>

      <!-- Admins Tab (New - Super Admin Only) -->
      <div id="admins-tab" class="tab-content">
        <div class="section-header">
          <h2>Manage Administrators</h2>
          <button id="add-admin-btn" class="btn btn-primary">+ Add Admin</button>
        </div>
        <div class="table-container">
          <div id="admins-list">Loading...</div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div id="settings-tab" class="tab-content">
        <div class="section-header">
          <h2>Website Settings</h2>
        </div>
        <div class="grid grid-2">
          <div style="background: var(--bg-white); padding: 2rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); border: 1px solid var(--border-color);">
            <form id="settings-form">
              <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--primary-dark); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; font-weight: 800;">
                Basic Information
              </h3>

              <div class="form-group">
                <label class="form-label" for="settings-site-name">Website Name</label>
                <input type="text" id="settings-site-name" name="site_name" class="form-input" placeholder="GlobalMart">
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-site-description">Website Description</label>
                <textarea id="settings-site-description" name="site_description" class="form-textarea" placeholder="Your trusted partner for high-quality industrial products..."></textarea>
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-company-intro">Company Introduction</label>
                <textarea id="settings-company-intro" name="company_intro" class="form-textarea" placeholder="We are a leading manufacturer and supplier..."></textarea>
              </div>

              <h3 style="font-size: 1.25rem; margin: 2rem 0 1.5rem; color: var(--primary-dark); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; font-weight: 800;">
                Contact Information
              </h3>

              <div class="form-group">
                <label class="form-label" for="settings-email">Email</label>
                <input type="email" id="settings-email" name="email" class="form-input" placeholder="info@example.com">
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-phone">Phone</label>
                <input type="text" id="settings-phone" name="phone" class="form-input" placeholder="+1 234 567 8900">
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-address">Address</label>
                <input type="text" id="settings-address" name="address" class="form-input" placeholder="123 Business St, City, Country">
              </div>

              <h3 style="font-size: 1.25rem; margin: 2rem 0 1.5rem; color: var(--primary-dark); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; font-weight: 800;">
                Social Media Links
              </h3>

              <div class="form-group">
                <label class="form-label" for="settings-linkedin">LinkedIn URL</label>
                <input type="url" id="settings-linkedin" name="linkedin" class="form-input" placeholder="https://linkedin.com/company/yourcompany">
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-facebook">Facebook URL</label>
                <input type="url" id="settings-facebook" name="facebook" class="form-input" placeholder="https://facebook.com/yourcompany">
              </div>

              <div class="form-group">
                <label class="form-label" for="settings-twitter">Twitter URL</label>
                <input type="url" id="settings-twitter" name="twitter" class="form-input" placeholder="https://twitter.com/yourcompany">
              </div>

              <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 2px solid var(--border-color); display: flex; gap: 1rem;">
                <button type="submit" id="save-settings-btn" class="btn btn-primary">💾 Save Settings</button>
                <button type="button" class="btn btn-secondary" onclick="loadSettings()">↺ Reset</button>
              </div>
            </form>
          </div>

          <div style="background: var(--bg-white); padding: 2rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); border: 1px solid var(--border-color);">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--text-dark); border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; font-weight: 800;">
              🔐 Change Password
            </h3>
            <form id="change-password-form">
              <div class="form-group">
                <label class="form-label" for="old-password">Current Password</label>
                <input type="password" id="old-password" class="form-input" required placeholder="Enter your current password">
              </div>

              <div class="form-group">
                <label class="form-label" for="new-password">New Password</label>
                <input type="password" id="new-password" class="form-input" required minlength="6" placeholder="At least 6 characters">
              </div>

              <div class="form-group">
                <label class="form-label" for="confirm-new-password">Confirm New Password</label>
                <input type="password" id="confirm-new-password" class="form-input" required minlength="6" placeholder="Re-enter your new password">
              </div>

              <div id="password-message" style="margin-bottom: 1rem; min-height: 24px; font-size: 0.9rem;"></div>

              <div>
                <button type="submit" id="update-password-btn" class="btn btn-primary">🔄 Update Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Product Edit/Add Modal -->
  <div id="product-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Edit Product</h2>
        <button class="modal-close" onclick="closeProductModal()">&times;</button>
      </div>
      <form id="product-form">
        <input type="hidden" id="product-id" name="id">

        <div class="form-group">
          <label class="form-label" for="product-name">Product Name *</label>
          <input type="text" id="product-name" name="name" class="form-input" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="product-category">Category</label>
          <select id="product-category" name="category" class="form-select">
            <option value="">Select a category...</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="product-description">Short Description</label>
          <textarea id="product-description" name="description" class="form-textarea" placeholder="Brief product description"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label" for="product-detailed-description">Detailed Description</label>
          <textarea id="product-detailed-description" name="detailed_description" class="form-textarea" placeholder="Full product description"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label" for="product-specifications">Specifications</label>
          <textarea id="product-specifications" name="specifications" class="form-textarea" placeholder="Technical specifications"></textarea>
        </div>

        <div class="image-upload-container">
          <label class="form-label">Product Image</label>
          <div class="upload-btn-wrapper">
            <button type="button" class="btn-upload">📷 Choose Image</button>
            <input type="file" id="image-upload" accept="image/*" onchange="handleImageUpload(event)">
          </div>
          <div id="upload-status" class="uploading" style="display: none;">⏳ Uploading...</div>
          <div id="image-preview" class="image-preview"></div>
        </div>

        <div class="form-group">
          <label class="form-label" for="product-image-url">Image URL (or upload above)</label>
          <input type="url" id="product-image-url" name="image_url" class="form-input" placeholder="https://example.com/image.jpg" readonly>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="product-is-featured" name="is_featured">
              <span>⭐ Featured Product</span>
            </label>
          </div>
          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="product-is-active" name="is_active" checked>
              <span>✅ Active</span>
            </label>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" onclick="closeProductModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">💾 Save Product</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Category Modal (New) -->
  <div id="category-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="category-modal-title">Edit Category</h2>
        <button class="modal-close" onclick="closeCategoryModal()">&times;</button>
      </div>
      <form id="category-form">
        <input type="hidden" id="category-id" name="id">

        <div class="form-group">
          <label class="form-label" for="category-name">Category Name *</label>
          <input type="text" id="category-name" name="name" class="form-input" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="category-description">Description</label>
          <textarea id="category-description" name="description" class="form-textarea" placeholder="Category description (optional)"></textarea>
        </div>

        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" id="category-is-active" name="is_active" checked>
            <span>✅ Active</span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" onclick="closeCategoryModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">💾 Save Category</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Admin Modal (New) -->
  <div id="admin-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="admin-modal-title">Add Admin</h2>
        <button class="modal-close" onclick="closeAdminModal()">&times;</button>
      </div>
      <form id="admin-form">
        <input type="hidden" id="admin-id" name="id">

        <div class="form-group">
          <label class="form-label" for="admin-username">Username *</label>
          <input type="text" id="admin-username" name="username" class="form-input" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="admin-email">Email *</label>
          <input type="email" id="admin-email" name="email" class="form-input" required>
        </div>

        <div class="form-group" id="admin-password-group">
          <label class="form-label" for="admin-password">Password *</label>
          <input type="password" id="admin-password" name="password" class="form-input" minlength="6" placeholder="At least 6 characters">
        </div>

        <div class="form-group">
          <label class="form-label" for="admin-role">Role</label>
          <select id="admin-role" name="role" class="form-select">
            <option value="admin">Regular Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-cancel" onclick="closeAdminModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">💾 Save Admin</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    // Enhanced API helper
    const API = {
      baseURL: '/api',
      async get(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          headers: { 'Authorization': \`Bearer \${token}\` }
        });
        return await response.json();
      },
      async post(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${token}\`
          },
          body: JSON.stringify(data)
        });
        return await response.json();
      },
      async put(endpoint, data) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${token}\`
          },
          body: JSON.stringify(data)
        });
        return await response.json();
      },
      async delete(endpoint) {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'DELETE',
          headers: { 'Authorization': \`Bearer \${token}\` }
        });
        return await response.json();
      }
    };

    // Notification system
    function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: \${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
      \`;
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    \`;
    document.head.appendChild(style);

    // Auth
    const token = localStorage.getItem('admin_token');
    const userRole = localStorage.getItem('admin_role') || 'admin';
    const isSuperAdmin = userRole === 'super_admin';

    if (!token) window.location.href = '/admin/login';

    // Verify token
    API.post('/admin/verify', { token }).then(response => {
      if (response.success && response.data.user) {
        localStorage.setItem('admin_role', response.data.user.role || 'admin');
        const roleIndicator = document.getElementById('admin-role-indicator');
        if (roleIndicator) {
          roleIndicator.textContent = response.data.user.role === 'super_admin' ? 'Super Admin' : 'Admin';
        }
        if (!isSuperAdmin) {
          document.querySelector('[data-tab="admins"]').style.display = 'none';
        }
      }
    }).catch(() => {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_role');
      window.location.href = '/admin/login';
    });

    // Logout
    function logout() {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_role');
      window.location.href = '/admin/login';
    }
    document.getElementById('logout-btn').addEventListener('click', e => { e.preventDefault(); logout(); });
    document.getElementById('logout-btn-header').addEventListener('click', logout);

    // Tab Navigation
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        const tabName = button.getAttribute('data-tab');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(\`\${tabName}-tab\`).classList.add('active');
        if (tabName === 'products') loadProducts();
        else if (tabName === 'categories') loadCategories();
        else if (tabName === 'inquiries') loadInquiries();
        else if (tabName === 'admins') loadAdmins();
        else if (tabName === 'settings') loadSettings();
      });
    });

    // Load Dashboard Stats
    async function loadDashboardStats() {
      try {
        const response = await API.get('/admin/stats');
        if (response.success) {
          const data = response.data;
          document.getElementById('stat-products').textContent = data.total_products || 0;
          document.getElementById('stat-inquiries').textContent = data.total_inquiries || 0;
          document.getElementById('stat-pending').textContent = data.pending_inquiries || 0;
          document.getElementById('stat-categories').textContent = data.total_categories || 0;
          const tbody = document.getElementById('recent-inquiries-tbody');
          if (data.recent_inquiries && data.recent_inquiries.length > 0) {
            tbody.innerHTML = data.recent_inquiries.map(inquiry => \`
              <tr>
                <td>\${inquiry.name}</td>
                <td>\${inquiry.email}</td>
                <td>\${inquiry.product_name || 'General Inquiry'}</td>
                <td><span class="badge badge-\${inquiry.status}">\${inquiry.status}</span></td>
                <td>\${new Date(inquiry.created_at).toLocaleDateString()}</td>
              </tr>
            \`).join('');
          } else {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-light);">No recent inquiries</td></tr>';
          }
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }

    // Load Products
    async function loadProducts() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          API.get('/products'),
          API.get('/categories')
        ]);
        
        const products = productsRes.data || [];
        const categories = categoriesRes.data || [];
        
        const categorySelect = document.getElementById('product-category');
        categorySelect.innerHTML = '<option value="">Select a category...</option>' + 
          categories.map(c => \`<option value="\${c.name}">\${c.name}</option>\`).join('');
        
        const container = document.getElementById('products-list');
        if (products.length === 0) {
          container.innerHTML = '<p style="padding: 3rem; text-align: center; color: var(--text-light);">No products found. Add your first product!</p>';
          return;
        }
        
        container.innerHTML = \`
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Status</th>
                \${isSuperAdmin ? '<th>Actions</th>' : ''}
              </tr>
            </thead>
            <tbody>
              \${products.map(product => \`
                <tr>
                  <td>\${product.id}</td>
                  <td style="font-weight: 600;">\${product.name}</td>
                  <td>\${product.category || 'N/A'}</td>
                  <td>\${product.is_featured ? '⭐ Yes' : 'No'}</td>
                  <td><span class="badge \${product.is_active ? 'badge-active' : 'badge-inactive'}">\${product.is_active ? 'Active' : 'Inactive'}</span></td>
                  \${isSuperAdmin ? \`
                    <td>
                      <button onclick="editProduct(\${product.id})" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">✏️ Edit</button>
                      <button onclick="deleteProduct(\${product.id})" class="btn btn-danger btn-sm">🗑️ Delete</button>
                    </td>
                  \` : ''}
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: #ef4444;">Error loading products</p>';
      }
    }

    // Load Categories (New)
    async function loadCategories() {
      try {
        const response = await API.get('/categories');
        const categories = response.data || [];
        const container = document.getElementById('categories-list');
        
        if (categories.length === 0) {
          container.innerHTML = '<p style="padding: 3rem; text-align: center; color: var(--text-light);">No categories found. Add your first category!</p>';
          return;
        }
        
        container.innerHTML = \`
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              \${categories.map(cat => \`
                <tr>
                  <td>\${cat.id}</td>
                  <td style="font-weight: 600;">\${cat.name}</td>
                  <td>\${cat.description || '-'}</td>
                  <td><span class="badge \${cat.is_active ? 'badge-active' : 'badge-inactive'}">\${cat.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button onclick="editCategory(\${cat.id})" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">✏️ Edit</button>
                    <button onclick="deleteCategory(\${cat.id})" class="btn btn-danger btn-sm">🗑️ Delete</button>
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById('categories-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: #ef4444;">Error loading categories</p>';
      }
    }

    // Load Inquiries
    async function loadInquiries() {
      try {
        const response = await API.get('/inquiries');
        const inquiries = response.data || [];
        const container = document.getElementById('inquiries-list');
        
        if (inquiries.length === 0) {
          container.innerHTML = '<p style="padding: 3rem; text-align: center; color: var(--text-light);">No inquiries yet.</p>';
          return;
        }
        
        container.innerHTML = \`
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              \${inquiries.map(inquiry => \`
                <tr>
                  <td>\${inquiry.id}</td>
                  <td style="font-weight: 600;">\${inquiry.name}</td>
                  <td>\${inquiry.email}</td>
                  <td>\${inquiry.product_name || 'General'}</td>
                  <td>
                    <select onchange="updateInquiryStatus(\${inquiry.id}, this.value)" class="form-select" style="width: auto; padding: 0.5rem; font-size: 0.875rem;">
                      <option value="pending" \${inquiry.status === 'pending' ? 'selected' : ''}>Pending</option>
                      <option value="processing" \${inquiry.status === 'processing' ? 'selected' : ''}>Processing</option>
                      <option value="completed" \${inquiry.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                  </td>
                  <td>\${new Date(inquiry.created_at).toLocaleDateString()}</td>
                  <td>
                    <button onclick="viewInquiry(\${inquiry.id})" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">👁️ View</button>
                    \${isSuperAdmin ? \`<button onclick="deleteInquiry(\${inquiry.id})" class="btn btn-danger btn-sm">🗑️ Delete</button>\` : ''}
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        console.error('Error loading inquiries:', error);
        document.getElementById('inquiries-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: #ef4444;">Error loading inquiries</p>';
      }
    }

    // Load Admins (New)
    async function loadAdmins() {
      if (!isSuperAdmin) return;
      try {
        const response = await API.get('/admins');
        const admins = response.data || [];
        const container = document.getElementById('admins-list');
        
        if (admins.length === 0) {
          container.innerHTML = '<p style="padding: 3rem; text-align: center; color: var(--text-light);">No administrators found.</p>';
          return;
        }
        
        container.innerHTML = \`
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              \${admins.map(admin => \`
                <tr>
                  <td>\${admin.id}</td>
                  <td style="font-weight: 600;">\${admin.username}</td>
                  <td>\${admin.email}</td>
                  <td><span class="badge \${admin.role === 'super_admin' ? 'badge-processing' : 'badge-pending'}">\${admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span></td>
                  <td>\${admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}</td>
                  <td>
                    <button onclick="editAdmin(\${admin.id})" class="btn btn-primary btn-sm" style="margin-right: 0.5rem;">✏️ Edit</button>
                    \${admin.id !== 1 ? \`<button onclick="deleteAdmin(\${admin.id})" class="btn btn-danger btn-sm">🗑️ Delete</button>\` : ''}
                  </td>
                </tr>
              \`).join('')}
            </tbody>
          </table>
        \`;
      } catch (error) {
        console.error('Error loading admins:', error);
        document.getElementById('admins-list').innerHTML = '<p style="padding: 2rem; text-align: center; color: #ef4444;">Error loading administrators</p>';
      }
    }

    // Product Functions
    window.handleImageUpload = async function(event) {
      const file = event.target.files[0];
      if (!file) return;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showNotification('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showNotification('File too large. Maximum size is 5MB.', 'error');
        return;
      }
      const uploadStatus = document.getElementById('upload-status');
      uploadStatus.style.display = 'flex';
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          headers: { 'Authorization': \`Bearer \${token}\` },
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          document.getElementById('product-image-url').value = result.data.url;
          document.getElementById('image-preview').innerHTML = \`<img src="\${result.data.url}" alt="Product preview">\`;
          showNotification('Image uploaded successfully', 'success');
        } else {
          showNotification(result.error || 'Upload failed', 'error');
        }
      } catch (error) {
        showNotification('Error uploading image', 'error');
      } finally {
        uploadStatus.style.display = 'none';
      }
    };

    window.editProduct = async function(id) {
      try {
        const response = await API.get(\`/products/\${id}\`);
        if (response.success) {
          const product = response.data;
          document.getElementById('product-id').value = product.id;
          document.getElementById('product-name').value = product.name || '';
          document.getElementById('product-category').value = product.category || '';
          document.getElementById('product-description').value = product.description || '';
          document.getElementById('product-detailed-description').value = product.detailed_description || '';
          document.getElementById('product-specifications').value = product.specifications || '';
          document.getElementById('product-image-url').value = product.image_url || '';
          document.getElementById('product-is-featured').checked = product.is_featured === 1;
          document.getElementById('product-is-active').checked = product.is_active === 1;
          document.getElementById('image-preview').innerHTML = product.image_url ? \`<img src="\${product.image_url}" alt="Product preview">\` : '';
          document.getElementById('modal-title').textContent = 'Edit Product';
          document.getElementById('product-modal').classList.add('active');
        }
      } catch (error) {
        showNotification('Error loading product details', 'error');
      }
    };

    window.closeProductModal = function() {
      document.getElementById('product-modal').classList.remove('active');
      document.getElementById('product-form').reset();
      document.getElementById('product-id').value = '';
      document.getElementById('image-preview').innerHTML = '';
      document.getElementById('image-upload').value = '';
    };

    window.openAddProductModal = function() {
      document.getElementById('product-form').reset();
      document.getElementById('product-id').value = '';
      document.getElementById('product-is-active').checked = true;
      document.getElementById('modal-title').textContent = 'Add New Product';
      document.getElementById('product-modal').classList.add('active');
    };

    document.getElementById('product-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const productId = document.getElementById('product-id').value;
      const formData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value,
        detailed_description: document.getElementById('product-detailed-description').value,
        specifications: document.getElementById('product-specifications').value,
        image_url: document.getElementById('product-image-url').value,
        is_featured: document.getElementById('product-is-featured').checked,
        is_active: document.getElementById('product-is-active').checked
      };
      try {
        let response;
        if (productId) {
          response = await API.put(\`/products/\${productId}\`, formData);
        } else {
          response = await API.post('/products', formData);
        }
        if (response.success || response.data) {
          showNotification(productId ? 'Product updated successfully' : 'Product created successfully', 'success');
          closeProductModal();
          loadProducts();
          loadDashboardStats();
        } else {
          showNotification(response.error || 'Failed to save product', 'error');
        }
      } catch (error) {
        showNotification('Error saving product', 'error');
      }
    });

    document.getElementById('product-modal').addEventListener('click', function(e) {
      if (e.target === this) closeProductModal();
    });

    window.deleteProduct = async function(id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
      try {
        await API.delete(\`/products/\${id}\`);
        showNotification('Product deleted successfully', 'success');
        loadProducts();
        loadDashboardStats();
      } catch (error) {
        showNotification('Error deleting product', 'error');
      }
    };

    document.getElementById('add-product-btn').addEventListener('click', () => openAddProductModal());
    if (!isSuperAdmin) {
      const addProductBtn = document.getElementById('add-product-btn');
      if (addProductBtn) addProductBtn.style.display = 'none';
    }

    // Category Functions (New)
    window.openAddCategoryModal = function() {
      document.getElementById('category-form').reset();
      document.getElementById('category-id').value = '';
      document.getElementById('category-is-active').checked = true;
      document.getElementById('category-modal-title').textContent = 'Add New Category';
      document.getElementById('category-modal').classList.add('active');
    };

    window.closeCategoryModal = function() {
      document.getElementById('category-modal').classList.remove('active');
      document.getElementById('category-form').reset();
      document.getElementById('category-id').value = '';
    };

    window.editCategory = async function(id) {
      try {
        const response = await API.get(\`/categories/\${id}\`);
        if (response.success) {
          const category = response.data;
          document.getElementById('category-id').value = category.id;
          document.getElementById('category-name').value = category.name || '';
          document.getElementById('category-description').value = category.description || '';
          document.getElementById('category-is-active').checked = category.is_active === 1;
          document.getElementById('category-modal-title').textContent = 'Edit Category';
          document.getElementById('category-modal').classList.add('active');
        }
      } catch (error) {
        showNotification('Error loading category details', 'error');
      }
    };

    window.deleteCategory = async function(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;
      try {
        await API.delete(\`/categories/\${id}\`);
        showNotification('Category deleted successfully', 'success');
        loadCategories();
        loadDashboardStats();
      } catch (error) {
        showNotification('Error deleting category', 'error');
      }
    };

    document.getElementById('add-category-btn').addEventListener('click', () => openAddCategoryModal());
    document.getElementById('category-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const categoryId = document.getElementById('category-id').value;
      const formData = {
        name: document.getElementById('category-name').value,
        description: document.getElementById('category-description').value,
        is_active: document.getElementById('category-is-active').checked
      };
      try {
        let response;
        if (categoryId) {
          response = await API.put(\`/categories/\${categoryId}\`, formData);
        } else {
          response = await API.post('/categories', formData);
        }
        if (response.success || response.data) {
          showNotification(categoryId ? 'Category updated successfully' : 'Category created successfully', 'success');
          closeCategoryModal();
          loadCategories();
          loadDashboardStats();
        } else {
          showNotification(response.error || 'Failed to save category', 'error');
        }
      } catch (error) {
        showNotification('Error saving category', 'error');
      }
    });

    document.getElementById('category-modal').addEventListener('click', function(e) {
      if (e.target === this) closeCategoryModal();
    });

    // Admin Functions (New)
    window.openAddAdminModal = function() {
      document.getElementById('admin-form').reset();
      document.getElementById('admin-id').value = '';
      document.getElementById('admin-password-group').style.display = 'block';
      document.getElementById('admin-modal-title').textContent = 'Add New Admin';
      document.getElementById('admin-modal').classList.add('active');
    };

    window.closeAdminModal = function() {
      document.getElementById('admin-modal').classList.remove('active');
      document.getElementById('admin-form').reset();
      document.getElementById('admin-id').value = '';
    };

    window.editAdmin = async function(id) {
      try {
        const response = await API.get(\`/admin/admins/\${id}\`);
        if (response.success) {
          const admin = response.data;
          document.getElementById('admin-id').value = admin.id;
          document.getElementById('admin-username').value = admin.username || '';
          document.getElementById('admin-email').value = admin.email || '';
          document.getElementById('admin-role').value = admin.role || 'admin';
          document.getElementById('admin-password-group').style.display = 'none';
          document.getElementById('admin-modal-title').textContent = 'Edit Admin';
          document.getElementById('admin-modal').classList.add('active');
        }
      } catch (error) {
        showNotification('Error loading admin details', 'error');
      }
    };

    window.deleteAdmin = async function(id) {
      if (!confirm('Are you sure you want to delete this administrator?')) return;
      try {
        await API.delete(\`/admin/admins/\${id}\`);
        showNotification('Admin deleted successfully', 'success');
        loadAdmins();
      } catch (error) {
        showNotification('Error deleting admin', 'error');
      }
    };

    document.getElementById('add-admin-btn').addEventListener('click', () => openAddAdminModal());
    document.getElementById('admin-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const adminId = document.getElementById('admin-id').value;
      const formData = {
        username: document.getElementById('admin-username').value,
        email: document.getElementById('admin-email').value,
        role: document.getElementById('admin-role').value,
      };
      if (document.getElementById('admin-password').value) {
        formData.password = document.getElementById('admin-password').value;
      }
      try {
        let response;
        if (adminId) {
          response = await API.put(\`/admin/admins/\${adminId}\`, formData);
        } else {
          response = await API.post('/admin/admins', formData);
        }
        if (response.success || response.data) {
          showNotification(adminId ? 'Admin updated successfully' : 'Admin created successfully', 'success');
          closeAdminModal();
          loadAdmins();
        } else {
          showNotification(response.error || 'Failed to save admin', 'error');
        }
      } catch (error) {
        showNotification('Error saving admin', 'error');
      }
    });

    document.getElementById('admin-modal').addEventListener('click', function(e) {
      if (e.target === this) closeAdminModal();
    });

    // Inquiry Functions
    window.viewInquiry = async function(id) {
      try {
        const response = await API.get(\`/inquiries/\${id}\`);
        if (response.success) {
          const inquiry = response.data;
          alert(\`Inquiry Details:
Name: \${inquiry.name}
Email: \${inquiry.email}
Product: \${inquiry.product_name || 'General'}
Message: \${inquiry.message}\`);
        }
      } catch (error) {
        showNotification('Error loading inquiry details', 'error');
      }
    };

    window.updateInquiryStatus = async function(id, status) {
      try {
        await API.put(\`/inquiries/\${id}\`, { status });
        showNotification('Inquiry status updated', 'success');
      } catch (error) {
        showNotification('Error updating inquiry status', 'error');
      }
    };

    window.deleteInquiry = async function(id) {
      if (!confirm('Are you sure you want to delete this inquiry?')) return;
      try {
        await API.delete(\`/inquiries/\${id}\`);
        showNotification('Inquiry deleted successfully', 'success');
        loadInquiries();
        loadDashboardStats();
      } catch (error) {
        showNotification('Error deleting inquiry', 'error');
      }
    };

    // Settings Functions
    window.loadSettings = async function() {
      try {
        const response = await API.get('/settings');
        if (response.success && response.data) {
          const settings = response.data;
          document.getElementById('settings-site-name').value = settings.site_name || '';
          document.getElementById('settings-site-description').value = settings.site_description || '';
          document.getElementById('settings-company-intro').value = settings.company_intro || '';
          document.getElementById('settings-email').value = settings.email || '';
          document.getElementById('settings-phone').value = settings.phone || '';
          document.getElementById('settings-address').value = settings.address || '';
          document.getElementById('settings-linkedin').value = settings.linkedin || '';
          document.getElementById('settings-facebook').value = settings.facebook || '';
          document.getElementById('settings-twitter').value = settings.twitter || '';
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    document.getElementById('settings-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = {
        site_name: document.getElementById('settings-site-name').value,
        site_description: document.getElementById('settings-site-description').value,
        company_intro: document.getElementById('settings-company-intro').value,
        email: document.getElementById('settings-email').value,
        phone: document.getElementById('settings-phone').value,
        address: document.getElementById('settings-address').value,
        linkedin: document.getElementById('settings-linkedin').value,
        facebook: document.getElementById('settings-facebook').value,
        twitter: document.getElementById('settings-twitter').value,
      };
      try {
        const response = await API.put('/settings', formData);
        if (response.success) {
          showNotification('Settings saved successfully', 'success');
        } else {
          showNotification(response.error || 'Failed to save settings', 'error');
        }
      } catch (error) {
        showNotification('Error saving settings', 'error');
      }
    });

    // Change Password Function
    document.getElementById('change-password-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const oldPassword = document.getElementById('old-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-new-password').value;
      const messageDiv = document.getElementById('password-message');

      if (newPassword !== confirmPassword) {
        messageDiv.innerHTML = '<span style="color: #ef4444;">Passwords do not match!</span>';
        return;
      }

      try {
        const response = await API.put('/admin/change-password', {
          old_password: oldPassword,
          new_password: newPassword
        });
        if (response.success) {
          messageDiv.innerHTML = '<span style="color: #10b981;">Password updated successfully!</span>';
          document.getElementById('change-password-form').reset();
        } else {
          messageDiv.innerHTML = '<span style="color: #ef4444;">' + (response.error || 'Failed to update password') + '</span>';
        }
      } catch (error) {
        messageDiv.innerHTML = '<span style="color: #ef4444;">Error updating password</span>';
      }
    });

    // Initialize dashboard
    loadDashboardStats();
  </script>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
