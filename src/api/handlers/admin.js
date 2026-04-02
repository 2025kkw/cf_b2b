/**
 * Admin API Handler
 * Handles admin authentication and admin-specific operations
 */

import { hashPassword, verifyPassword, generateToken, verifyToken } from '../../utils/auth';

// 优先使用环境变量，如果没有则使用默认值（仅用于开发）
const JWT_SECRET = typeof process !== 'undefined' && process.env.JWT_SECRET 
  ? process.env.JWT_SECRET 
  : 'your-secret-key-change-this-in-production';

export async function handleAdmin(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // POST /api/admin/login - Admin login
  if (method === 'POST' && pathParts[2] === 'login') {
    return adminLogin(request, env, corsHeaders);
  }

  // POST /api/admin/verify - Verify token
  if (method === 'POST' && pathParts[2] === 'verify') {
    return verifyAdminToken(request, env, corsHeaders);
  }

  // POST /api/admin/logout - Admin logout
  if (method === 'POST' && pathParts[2] === 'logout') {
    return adminLogout(request, env, corsHeaders);
  }

  // GET /api/admin/stats - Get dashboard statistics (Admin only)
  if (method === 'GET' && pathParts[2] === 'stats') {
    return getDashboardStats(request, env, corsHeaders);
  }

  // GET /api/admins - Get all admins (Super Admin only)
  if (method === 'GET' && pathParts[2] === 'admins') {
    return getAllAdmins(request, env, corsHeaders);
  }

  // GET /api/admins/:id - Get single admin (Super Admin only)
  if (method === 'GET' && pathParts[2] === 'admins' && pathParts.length === 4) {
    const adminId = pathParts[3];
    return getAdmin(request, env, adminId, corsHeaders);
  }

  // POST /api/admins - Create new admin (Super Admin only)
  if (method === 'POST' && pathParts[2] === 'admins') {
    return createAdmin(request, env, corsHeaders);
  }

  // PUT /api/admins/:id - Update admin (Super Admin only)
  if (method === 'PUT' && pathParts[2] === 'admins' && pathParts.length === 4) {
    const adminId = pathParts[3];
    return updateAdmin(request, env, adminId, corsHeaders);
  }

  // DELETE /api/admins/:id - Delete admin (Super Admin only)
  if (method === 'DELETE' && pathParts[2] === 'admins' && pathParts.length === 4) {
    const adminId = pathParts[3];
    return deleteAdmin(request, env, adminId, corsHeaders);
  }

  // PUT /api/admin/change-password - 修改当前登录用户密码 (新增)
  if (method === 'PUT' && pathParts[2] === 'change-password') {
    return changePassword(request, env, corsHeaders);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Admin login
async function adminLogin(request, env, corsHeaders) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(JSON.stringify({
        error: 'Username and password are required'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get admin user
    const admin = await env.DB.prepare(
      'SELECT * FROM admins WHERE username = ?'
    ).bind(username).first();

    if (!admin) {
      return new Response(JSON.stringify({
        error: 'Invalid username or password'
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return new Response(JSON.stringify({
        error: 'Invalid username or password'
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update last login
    await env.DB.prepare(
      'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(admin.id).run();

    // Determine the correct secret source
    const secret = env.JWT_SECRET || JWT_SECRET;

    // Generate JWT token
    const token = await generateToken({
      id: admin.id,
      username: admin.username,
      role: admin.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }, secret);

    return new Response(JSON.stringify({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Verify admin token
async function verifyAdminToken(request, env, corsHeaders) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({
        error: 'Token is required'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const secret = env.JWT_SECRET || JWT_SECRET;
    const payload = await verifyToken(token, secret);

    if (!payload) {
      return new Response(JSON.stringify({
        error: 'Invalid or expired token'
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get admin user
    const admin = await env.DB.prepare(
      'SELECT id, username, email, role FROM admins WHERE id = ?'
    ).bind(payload.id).first();

    if (!admin) {
      return new Response(JSON.stringify({
        error: 'User not found'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: { user: admin },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Admin logout
async function adminLogout(request, env, corsHeaders) {
  // Client-side will handle removing the token
  return new Response(JSON.stringify({
    success: true,
    message: 'Logged out successfully',
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Get dashboard statistics
async function getDashboardStats(request, env, corsHeaders) {
  try {
    // 检查身份认证
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get total products
    const { total_products } = await env.DB.prepare(
      'SELECT COUNT(*) as total_products FROM products WHERE is_active = 1'
    ).first();

    // Get total inquiries
    const { total_inquiries } = await env.DB.prepare(
      'SELECT COUNT(*) as total_inquiries FROM inquiries'
    ).first();

    // Get pending inquiries
    const { pending_inquiries } = await env.DB.prepare(
      'SELECT COUNT(*) as pending_inquiries FROM inquiries WHERE status = "pending"'
    ).first();

    // Get total categories
    const { total_categories } = await env.DB.prepare(
      'SELECT COUNT(*) as total_categories FROM categories WHERE is_active = 1'
    ).first();

    // Get recent inquiries
    const { results: recent_inquiries } = await env.DB.prepare(
      `SELECT i.*, p.name as product_name
       FROM inquiries i
       LEFT JOIN products p ON i.product_id = p.id
       ORDER BY i.created_at DESC
       LIMIT 5`
    ).all();

    return new Response(JSON.stringify({
      success: true,
      data: {
        total_products,
        total_inquiries,
        pending_inquiries,
        total_categories,
        recent_inquiries,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Get all admins (Super Admin only)
async function getAllAdmins(request, env, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { results } = await env.DB.prepare(
      'SELECT id, username, email, role, is_active, last_login, created_at FROM admins ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Get single admin (Super Admin only)
async function getAdmin(request, env, adminId, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await env.DB.prepare(
      'SELECT id, username, email, role, is_active, last_login, created_at FROM admins WHERE id = ?'
    ).bind(adminId).first();

    if (!result) {
      return new Response(JSON.stringify({ error: 'Admin not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Create new admin (Super Admin only)
async function createAdmin(request, env, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.username || !data.email || !data.password) {
      return new Response(JSON.stringify({ error: 'Username, email, and password are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (data.password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const passwordHash = await hashPassword(data.password);

    const result = await env.DB.prepare(
      `INSERT INTO admins (username, email, password_hash, role, is_active)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      data.username,
      data.email,
      passwordHash,
      data.role || 'admin',
      data.is_active !== undefined ? data.is_active : 1
    ).run();

    return new Response(JSON.stringify({
      success: true,
      data: { id: result.meta.last_row_id }
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Username or email already exists' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Update admin (Super Admin only)
async function updateAdmin(request, env, adminId, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prevent updating admin with id 1 (the default super admin)
    if (adminId == 1) {
      return new Response(JSON.stringify({ error: 'Cannot update the default super admin account' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Build update query dynamically
    let updates = [];
    let params = [];

    if (data.username !== undefined) {
      updates.push('username = ?');
      params.push(data.username);
    }
    if (data.email !== undefined) {
      updates.push('email = ?');
      params.push(data.email);
    }
    if (data.role !== undefined) {
      updates.push('role = ?');
      params.push(data.role);
    }
    if (data.is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(data.is_active ? 1 : 0);
    }
    if (data.password !== undefined) {
      if (data.password.length < 6) {
        return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const passwordHash = await hashPassword(data.password);
      updates.push('password_hash = ?');
      params.push(passwordHash);
    }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(adminId);

    const query = `UPDATE admins SET ${updates.join(', ')} WHERE id = ?`;

    await env.DB.prepare(query).bind(...params).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Username or email already exists' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Delete admin (Super Admin only)
async function deleteAdmin(request, env, adminId, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prevent deleting admin with id 1 (the default super admin)
    if (adminId == 1) {
      return new Response(JSON.stringify({ error: 'Cannot delete the default super admin account' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare('DELETE FROM admins WHERE id = ?').bind(adminId).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

/**
 * 修改密码 API (整合版)
 */
async function changePassword(request, env, corsHeaders) {
  try {
    // 1. 验证身份 (复用现有的 requireAuth)
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: '未授权，请重新登录' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. 解析请求体
    const { oldPassword, newPassword } = await request.json();
    if (!oldPassword || !newPassword) {
      return new Response(JSON.stringify({ error: '旧密码和新密码不能为空' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (newPassword.length < 6) {
      return new Response(JSON.stringify({ error: '新密码长度至少6位' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. 查询当前用户完整信息 (用于验证旧密码)
    const currentAdmin = await env.DB.prepare(
      'SELECT password_hash FROM admins WHERE id = ?'
    ).bind(admin.id).first();

    if (!currentAdmin) {
      return new Response(JSON.stringify({ error: '用户不存在' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 4. 验证旧密码是否正确 (复用 utils/auth 里的 verifyPassword)
    // 注意：这里假设 verifyPassword 是比较明文和哈希的函数
    const isValid = await verifyPassword(oldPassword, currentAdmin.password_hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: '旧密码错误' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 5. 生成新密码哈希并更新 (复用 utils/auth 里的 hashPassword)
    const newPasswordHash = await hashPassword(newPassword);
    await env.DB.prepare(
      'UPDATE admins SET password_hash = ? WHERE id = ?'
    ).bind(newPasswordHash, admin.id).run();

    return new Response(JSON.stringify({
      success: true,
      message: '密码修改成功，请使用新密码重新登录'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Change password error:', error);
    return new Response(JSON.stringify({ error: '服务器内部错误' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Helper function to check authentication
export async function requireAuth(request, env) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const secret = env.JWT_SECRET || JWT_SECRET;
  const payload = await verifyToken(token, secret);

  if (!payload) {
    return null;
  }

  // Get admin with role
  const admin = await env.DB.prepare(
    'SELECT id, username, email, role FROM admins WHERE id = ?'
  ).bind(payload.id).first();

  return admin;
}

// Helper function to check if user is super admin
export async function requireSuperAdmin(request, env) {
  const admin = await requireAuth(request, env);

  if (!admin || admin.role !== 'super_admin') {
    return null;
  }

  return admin;
}
