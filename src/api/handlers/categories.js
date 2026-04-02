/**
 * Categories API Handler
 * Handles all category-related API requests
 */

import { requireAuth, requireSuperAdmin } from './admin';

export async function handleCategories(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // GET /api/categories - Get all categories
  if (method === 'GET' && pathParts.length === 2) {
    return getAllCategories(env, corsHeaders, request);
  }

  // GET /api/categories/:id - Get single category
  if (method === 'GET' && pathParts.length === 3) {
    const categoryId = pathParts[2];
    return getCategory(env, categoryId, corsHeaders, request);
  }

  // POST /api/categories - Create new category (Admin only)
  if (method === 'POST' && pathParts.length === 2) {
    return createCategory(request, env, corsHeaders);
  }

  // PUT /api/categories/:id - Update category (Admin only)
  if (method === 'PUT' && pathParts.length === 3) {
    const categoryId = pathParts[2];
    return updateCategory(request, env, categoryId, corsHeaders);
  }

  // DELETE /api/categories/:id - Delete category (Super Admin only)
  if (method === 'DELETE' && pathParts.length === 3) {
    const categoryId = pathParts[2];
    return deleteCategory(request, env, categoryId, corsHeaders);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Get all categories
async function getAllCategories(env, corsHeaders, request) {
  try {
    // Check if this is an authenticated admin request
    const authHeader = request?.headers?.get('Authorization');
    const isAdmin = authHeader && authHeader.startsWith('Bearer ');

    // Admin can see all categories, public can only see active ones
    let query;
    if (isAdmin) {
      query = env.DB.prepare('SELECT * FROM categories ORDER BY sort_order ASC, name ASC');
    } else {
      query = env.DB.prepare('SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC, name ASC');
    }

    const { results } = await query.all();

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

// Get single category
async function getCategory(env, categoryId, corsHeaders, request) {
  try {
    // Check if this is an authenticated admin request
    const authHeader = request?.headers?.get('Authorization');
    const isAdmin = authHeader && authHeader.startsWith('Bearer ');

    // Admin can see all categories, public can only see active ones
    let query;
    if (isAdmin) {
      query = env.DB.prepare('SELECT * FROM categories WHERE id = ?');
    } else {
      query = env.DB.prepare('SELECT * FROM categories WHERE id = ? AND is_active = 1');
    }

    const category = await query.bind(categoryId).first();

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: category }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Create new category (Admin only)
async function createCategory(request, env, corsHeaders) {
  try {
    // Check if user is authenticated
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({
        error: 'Unauthorized. Admin access required.'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name) {
      return new Response(JSON.stringify({
        error: 'Category name is required'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO categories (name, description, sort_order, is_active)
       VALUES (?, ?, ?, ?)`
    ).bind(
      data.name,
      data.description || null,
      data.sort_order || 0,
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
    // Check for unique constraint violation
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({
        error: 'Category name already exists'
      }), {
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

// Update category (Admin only)
async function updateCategory(request, env, categoryId, corsHeaders) {
  try {
    // Check if user is authenticated
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({
        error: 'Unauthorized. Admin access required.'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    await env.DB.prepare(
      `UPDATE categories SET
        name = ?,
        description = ?,
        sort_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(
      data.name,
      data.description || null,
      data.sort_order !== undefined ? data.sort_order : 0,
      data.is_active !== undefined ? data.is_active : 1,
      categoryId
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Check for unique constraint violation
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({
        error: 'Category name already exists'
      }), {
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

// Delete category (Super Admin only)
async function deleteCategory(request, env, categoryId, corsHeaders) {
  try {
    // Check if user is super admin
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({
        error: 'Unauthorized. Super admin access required.'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // First, check if there are products using this category
    const { count: productCount } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?'
    ).bind(categoryId).first();

    if (productCount > 0) {
      return new Response(JSON.stringify({
        error: `Cannot delete category. There are ${productCount} products using this category.`
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare(
      'DELETE FROM categories WHERE id = ?'
    ).bind(categoryId).run();

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
