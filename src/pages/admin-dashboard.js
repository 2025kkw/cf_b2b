/**
 * Admin Dashboard Page
 * Main admin interface for managing products and inquiries
 */
export async function adminDashboard(env) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - B2B Product Exhibition</title>
  <link rel="stylesheet" href="/static/css/style.css">
  <link rel="stylesheet" href="/static/css/admin.css">
</head>
<body>
  <div class="admin-container">
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <h2>B2B Admin</h2>
      </div>
      <nav class="admin-nav">
        <ul>
          <li><a href="#dashboard" class="active">📊 Overview</a></li>
          <li><a href="#products">📦 Products</a></li>
          <li><a href="#inquiries">📧 Inquiries</a></li>
          <li><a href="#settings">⚙️ Settings</a></li>
          <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
        </ul>
      </nav>
    </aside>

    <main class="admin-main">
      <header class="admin-header">
        <h1>Dashboard</h1>
        <div class="admin-user">
          <span>Welcome back, <strong id="adminUsername">Admin</strong></span>
          <span id="lastLogin">Loading...</span>
        </div>
      </header>

      <section id="dashboard" class="admin-section">
        <div class="section-header">
          <h2>Overview</h2>
          <div class="actions">
            <a href="/" target="_blank" class="btn btn-secondary">🔗 Preview</a>
            <button class="btn btn-danger" id="headerLogoutBtn">Logout</button>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Products</h3>
            <p class="stat-number" id="totalProducts">0</p>
          </div>
          <div class="stat-card">
            <h3>Total Inquiries</h3>
            <p class="stat-number" id="totalInquiries">0</p>
          </div>
          <div class="stat-card">
            <h3>Pending Inquiries</h3>
            <p class="stat-number" id="pendingInquiries">0</p>
          </div>
        </div>

        <div class="recent-section">
          <h2>Recent Inquiries</h2>
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody id="recentInquiriesTable">
              <tr><td colspan="5">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="products" class="admin-section">
        <div class="section-header">
          <h2>Manage Products</h2>
          <button class="btn btn-primary" id="addProductBtn">+ Add Product</button>
        </div>
        <div id="productsTableContainer">Loading...</div>
      </section>

      <section id="inquiries" class="admin-section">
        <div class="section-header">
          <h2>Manage Inquiries</h2>
        </div>
        <div id="inquiriesTableContainer">Loading...</div>
      </section>

      <section id="settings" class="admin-section">
        <div class="section-header">
          <h2>Website Settings</h2>
        </div>

        <form id="settingsForm" class="settings-form">
          <h3>🌐 Basic Information</h3>

          <div class="form-group">
            <label for="siteName">Website Name</label>
            <input type="text" id="siteName" name="siteName">
          </div>

          <div class="form-group">
            <label for="siteDescription">Website Description</label>
            <textarea id="siteDescription" name="siteDescription" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="companyIntro">Company Introduction</label>
            <textarea id="companyIntro" name="companyIntro" rows="5"></textarea>
          </div>

          <h3>📞 Contact Information</h3>

          <div class="form-group">
            <label for="contactEmail">Email</label>
            <input type="email" id="contactEmail" name="contactEmail">
          </div>

          <div class="form-group">
            <label for="contactPhone">Phone</label>
            <input type="text" id="contactPhone" name="contactPhone">
          </div>

          <div class="form-group">
            <label for="contactAddress">Address</label>
            <textarea id="contactAddress" name="contactAddress" rows="3"></textarea>
          </div>

          <h3>🔗 Social Media Links</h3>

          <div class="form-group">
            <label for="linkedinUrl">LinkedIn URL</label>
            <input type="url" id="linkedinUrl" name="linkedinUrl">
          </div>

          <div class="form-group">
            <label for="facebookUrl">Facebook URL</label>
            <input type="url" id="facebookUrl" name="facebookUrl">
          </div>

          <div class="form-group">
            <label for="twitterUrl">Twitter URL</label>
            <input type="url" id="twitterUrl" name="twitterUrl">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Settings</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </form>
      </section>

      <section class="admin-section">
        <div class="section-header">
          <h2>Change Password</h2>
        </div>

        <form id="changePasswordForm" class="settings-form">
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" required>
          </div>

          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" minlength="8" required>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" minlength="8" required>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Update Password</button>
          </div>

          <p id="changePasswordMessage" style="margin-top:10px;"></p>
        </form>
document.getElementById('changePasswordForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('adminToken');
  const messageEl = document.getElementById('changePasswordMessage');

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  messageEl.textContent = '';

  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmPassword
    })
  });

  const data = await res.json();

  if (!res.ok) {
    messageEl.textContent = data.error || 'Failed to change password';
    return;
  }

  messageEl.textContent = 'Password updated successfully';
  document.getElementById('changePasswordForm').reset();
});
      </section>
      <div id="editProductModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Edit Product</h2>
          <form id="editProductForm">
            <input type="hidden" id="editProductId">

            <div class="form-group">
              <label for="editProductName">Product Name *</label>
              <input type="text" id="editProductName" required>
            </div>

            <div class="form-group">
              <label for="editProductCategory">Category</label>
              <input type="text" id="editProductCategory">
            </div>

            <div class="form-group">
              <label for="editProductShortDesc">Short Description</label>
              <textarea id="editProductShortDesc" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="editProductDescription">Detailed Description</label>
              <textarea id="editProductDescription" rows="6"></textarea>
            </div>

            <div class="form-group">
              <label for="editProductSpecs">Specifications</label>
              <textarea id="editProductSpecs" rows="4"></textarea>
            </div>

            <div class="form-group">
              <label for="editProductImage">Product Image</label>
              <input type="file" id="editProductImage" accept="image/*">
              <small>Choose Image</small>
              <div id="uploadStatus" style="display:none;">Uploading...</div>
            </div>

            <div class="form-group">
              <label for="editProductImageUrl">Image URL (or upload above)</label>
              <input type="url" id="editProductImageUrl">
            </div>

            <div class="form-group checkbox-group">
              <label><input type="checkbox" id="editProductFeatured"> Featured Product</label>
            </div>

            <div class="form-group checkbox-group">
              <label><input type="checkbox" id="editProductActive" checked> Active</label>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" id="cancelEditBtn">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>

  <script>
    document.getElementById('changePasswordForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const token = localStorage.getItem('adminToken');
      const messageEl = document.getElementById('changePasswordMessage');

      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      messageEl.textContent = '';
      messageEl.style.color = '';

      try {
        const res = await fetch('/api/admin/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${token}\`
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword
          })
        });

        const data = await res.json();

        if (!res.ok) {
          messageEl.textContent = data.error || 'Failed to change password';
          messageEl.style.color = 'red';
          return;
        }

        messageEl.textContent = 'Password updated successfully';
        messageEl.style.color = 'green';
        document.getElementById('changePasswordForm').reset();
      } catch (error) {
        messageEl.textContent = 'Network error, please try again';
        messageEl.style.color = 'red';
      }
    });
  </script>
</body>
</html>
`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}
