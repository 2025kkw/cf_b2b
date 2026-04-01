export async function homePage(env) {
  // 1. 先从KV中读取网站设置（包含我们新增的欢迎标题）
  let settings = {};
  try {
    const settingsStr = await env.STATIC_ASSETS.get('site_settings');
    if (settingsStr) {
      settings = JSON.parse(settingsStr);
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }

  // 2. 兜底逻辑：没设置就用默认标题
  const welcomeTitle = settings.welcome_title || 'Welcome to Our B2B Product Exhibition';
  const siteName = settings.site_name || 'B2B Product Exhibition';
  const siteDescription = settings.site_description || 'Your trusted B2B supplier';

  // 3. 把动态标题渲染到HTML中
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteName}</title>
  <meta name="description" content="${siteDescription}">
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <!-- 导航栏 -->
  <header class="header">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo">${siteName}</a>
        <nav class="nav">
          <a href="/" class="nav-link active">Home</a>
          <a href="/products" class="nav-link">Products</a>
          <a href="/about" class="nav-link">About</a>
          <a href="/contact" class="nav-link">Contact</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- 首页Hero区域，这里就是原来硬编码标题的位置 -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <!-- 替换为动态变量 -->
        <h1>${welcomeTitle}</h1>
        <p>${siteDescription}</p>
        <a href="/products" class="btn btn-primary">Browse Products</a>
        <a href="/contact" class="btn btn-secondary">Contact Us</a>
      </div>
    </div>
  </section>

  <!-- 其他首页原有内容 -->
  <!-- ...... 保留你原来的特色产品、公司介绍等代码 ...... -->

  <script src="/js/main.js"></script>
</body>
</html>`;

    // ... (前面是 HTML 模板字符串) ...
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}

// 👇 必须确保有这一行！这是最容易丢失的部分
export { adminDashboard };
