/**
 * Admin Dashboard Page
 */

// 注意：函数定义必须在最前面，且必须带 async
export async function adminDashboard(env) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard</title>
  <style>
    :root {
      --primary-color: #2563eb;
      --text-dark: #1f2937;
      --text-light: #6b7280;
      --bg-light: #f9fafb;
      --border-color: #e5e7eb;
    }
    body { font-family: system-ui, sans-serif; margin: 0; background: var(--bg-light); color: var(--text-dark); }
    .admin-layout { display: flex; min-height: 100vh; }
    .admin-sidebar { width: 250px; background: #1f2937; color: white; padding: 2rem; position: fixed; height: 100vh; }
    .admin-content { flex: 1; margin-left: 250px; padding: 2rem; }
    .admin-header { background: white; padding: 1.5rem 2rem; margin: -2rem -2rem 2rem -2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; justify-content: space-between; }
    .sidebar-nav { list-style: none; padding: 0; }
    .sidebar-nav a { display: block; padding: 1rem; color: #9ca3af; text-decoration: none; margin-bottom: 0.5rem; border-radius: 0.375rem; }
    .sidebar-nav a:hover, .sidebar-nav a.active { background: rgba(255,255,255,0.1); color: white; }
    .btn { padding: 0.75rem 1.5rem; border-radius: 0.375rem; border: none; cursor: pointer; font-weight: 600; text-decoration: none; display: inline-block; }
    .btn-primary { background: var(--primary-color); color: white; }
    .btn-primary:hover { background: #1e40af; }
    .btn-secondary { background: #f59e0b; color: white; }
    .card { background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 2rem; }
    .form-group { margin-bottom: 1.5rem; }
    .form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .form-input { width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.375rem; font-size: 1rem; box-sizing: border-box; }
    .form-input:focus { outline: none; border-color: var(--primary-color); }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem; }
    .stat-card { background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .stat-value { font-size: 2rem; font-weight: 700; color: var(--primary-color); }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-color); }
    .table th { background: var(--bg-light); }
    #password-message { min-height: 20px; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h2 style="color: #f59e0b; margin-top:0;">B2B Admin</h2>
      <ul class="sidebar-nav">
        <li><a href="#" data-tab="overview" class="active">📊 Overview</a></li>
        <li><a href="#" data-tab="products">📦 Products</a></li>
        <li><a href="#" data-tab="inquiries">💬 Inquiries</a></li>
        <li><a href="#" data-tab="settings">⚙️ Settings</a></li>
        <li><a href="#" id="logout-btn">🚪 Logout</a></li>
      </ul>
    </aside>

    <main class="admin-content">
      <div class="admin-header">
        <div>
          <h1 style="margin:0;">Dashboard</h1>
          <p style="color: var(--text-light); margin: 0.25rem 0 0 0;">Welcome back, <span id="admin-username">Admin</span></p>
        </div>
        <div>
          <a href="/" target="_blank" class="btn btn-primary" style="margin-right: 1rem;">Preview</a>
          <button id="logout-btn-header" class="btn btn-secondary">Logout</button>
        </div>
      </div>

      <!-- Overview Tab -->
      <div id="overview-tab" class="tab-content active">
        <div class="grid-3">
          <div class="stat-card"><h3 style="margin:0 0 0.5rem 0; color: var(--text-light); font-size: 0.875rem;">Total Products</h3><div class="stat-value" id="stat-products">0</div></div>
          <div class="stat-card"><h3 style="margin:0 0 0.5rem 0; color: var(--text-light); font-size: 0.875rem;">Total Inquiries</h3><div class="stat-value" id="stat-inquiries">0</div></div>
          <div class="stat-card"><h3 style="margin:0 0 0.5rem 0; color: var(--text-light); font-size: 0.875rem;">Pending</h3><div class="stat-value" id="stat-pending">0</div></div>
        </div>
        <div class="card">
          <h2 style="margin-top:0;">Recent Inquiries</h2>
          <table class="table"><thead><tr><th>Name</th><th>Email</th><th>Product</th><th>Status</th><th>Date</th></tr></thead><tbody id="recent-inquiries-tbody"><tr><td colspan="5" style="text-align:center;">Loading...</td></tr></tbody></table>
        </div>
      </div>

      <!-- Products Tab -->
      <div id="products-tab" class="tab-content">
        <div class="card" id="products-list">Loading products...</div>
      </div>

      <!-- Inquiries Tab -->
      <div id="inquiries-tab" class="tab-content">
        <div class="card" id="inquiries-list">Loading inquiries...</div>
      </div>

      <!-- Settings Tab -->
      <div id="settings-tab" class="tab-content">
        <!-- Website Settings -->
        <div class="card">
          <h2 style="margin-top:0; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">Website Settings</h2>
          <form id="settings-form">
            <div class="form-group">
              <label class="form-label" for="settings-site-name">Website Name</label>
              <input type="text" id="settings-site-name" class="form-input" placeholder="GlobalMart">
            </div>
            <!-- 新增：欢迎标题配置 -->
            <div class="form-group">
              <label class="form-label" for="settings-welcome-title">Homepage Welcome Title</label>
              <input type="text" id="settings-welcome-title" class="form-input" placeholder="Welcome to Our B2B Product Exhibition">
            </div>
            <div class="form-group">
              <label class="form-label" for="settings-site-description">Description</label>
              <textarea id="settings-site-description" class="form-input" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save Settings</button>
          </form>
        </div>

        <!-- Change Password -->
        <div class="card" style="border-top: 4px solid var(--primary-color);">
          <h2 style="margin-top:0; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">🔐 Change Password</h2>
          <form id="change-password-form">
            <div class="form-group">
              <label class="form-label" for="old-password">Current Password</label>
              <input type="password" id="old-password" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="new-password">New Password</label>
              <input type="password" id="new-password" class="form-input" required minlength="6">
            </div>
            <div class="form-group">
              <label class="form-label" for="confirm-new-password">Confirm New Password</label>
              <input type="password" id="confirm-new-password" class="form-input" required minlength="6">
            </div>
            <div id="password-message"></div>
            <button type="submit" class="btn btn-primary">Update Password</button>
          </form>
        </div>
      </div>
    </main>
  </div>

  <script>
    // API Helper
    const API = {
      baseURL: '/api',
      async get(endpoint) {
        const res = await fetch(\`\${this.baseURL}\${endpoint}\`, { headers: { 'Authorization': \`Bearer \${localStorage.getItem('admin_token')}\` }});
        return res.json();
      },
      async post(endpoint, data) {
        const res = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${localStorage.getItem('admin_token')}\` },
          body: JSON.stringify(data)
        });
        return res.json();
      },
      async put(endpoint, data) {
        const res = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${localStorage.getItem('admin_token')}\` },
          body: JSON.stringify(data)
        });
        return res.json();
      }
    };

    function showNotification(msg, type='info') {
      const n = document.createElement('div');
      n.textContent = msg;
      n.style.cssText = \`position:fixed;top:20px;right:20px;padding:1rem 1.5rem;background:\${type==='success'?'#10b981':type==='error'?'#ef4444':'#3b82f6'};color:white;border-radius:0.5rem;z-index:9999;\`;
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 3000);
    }

    function logout() { localStorage.removeItem('admin_token'); window.location.href = '/admin/login'; }
    document.getElementById('logout-btn').addEventListener('click', (e) => { e.preventDefault(); logout(); });
    document.getElementById('logout-btn-header').addEventListener('click', logout);

    // Tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(\`\${tab}-tab\`).classList.add('active');
        if(tab === 'settings') loadSettings();
      });
    });

    // Load Stats
    async function loadDashboardStats() {
      try {
        const r = await API.get('/admin/stats');
        if(r.success) {
          document.getElementById('stat-products').textContent = r.data.total_products || 0;
          document.getElementById('stat-inquiries').textContent = r.data.total_inquiries || 0;
          document.getElementById('stat-pending').textContent = r.data.pending_inquiries || 0;
        }
      } catch(e) { console.error(e); }
    }

    // Settings
    async function loadSettings() {
      try {
        const r = await API.get('/settings');
        if(r.success) {
          document.getElementById('settings-site-name').value = r.data.site_name || '';
          document.getElementById('settings-welcome-title').value = r.data.welcome_title || '';
          document.getElementById('settings-site-description').value = r.data.site_description || '';
        }
      } catch(e) { console.error(e); }
    }
    window.loadSettings = loadSettings;

    document.getElementById('settings-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        site_name: document.getElementById('settings-site-name').value,
        welcome_title: document.getElementById('settings-welcome-title').value,
        site_description: document.getElementById('settings-site-description').value
      };
      try {
        const r = await API.post('/settings', data);
        if(r.success) showNotification('Settings saved!', 'success');
      } catch(e) { showNotification('Error saving settings', 'error'); }
    });

    // Change Password
    document.getElementById('change-password-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const oldPwd = document.getElementById('old-password').value;
      const newPwd = document.getElementById('new-password').value;
      const confirmPwd = document.getElementById('confirm-new-password').value;
      const msgDiv = document.getElementById('password-message');
      const token = localStorage.getItem('admin_token');

      if(newPwd !== confirmPwd) {
        msgDiv.textContent = '❌ Passwords do not match';
        msgDiv.style.color = '#ef4444';
        return;
      }

      msgDiv.textContent = 'Updating...';
      msgDiv.style.color = '#6b7280';

      try {
        const res = await fetch('/api/admin/change-password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
          body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd })
        });
        
        if(res.ok) {
          msgDiv.textContent = '✅ Success! Logging out...';
          msgDiv.style.color = '#10b981';
          setTimeout(logout, 2000);
        } else {
          const err = await res.json();
          msgDiv.textContent = \`❌ Error: \${err.error || 'Failed'}\`;
          msgDiv.style.color = '#ef4444';
        }
      } catch(err) {
        msgDiv.textContent = '❌ Network error';
        msgDiv.style.color = '#ef4444';
      }
    });

    // Init
    loadDashboardStats();
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}
