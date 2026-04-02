/**
 * Customers API Handler
 * Handles customer management operations
 */

import { requireAuth, requireSuperAdmin } from '../../utils/auth';

export async function handleCustomers(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // GET /api/customers - Get all customers (Admin only)
  if (method === 'GET' && pathParts.length === 3) {
    return getAllCustomers(request, env, corsHeaders);
  }

  // GET /api/customers/:id - Get single customer (Admin only)
  if (method === 'GET' && pathParts.length === 4) {
    const customerId = pathParts[3];
    return getCustomer(request, env, customerId, corsHeaders);
  }

  // POST /api/customers - Create new customer (Admin only)
  if (method === 'POST' && pathParts.length === 3) {
    return createCustomer(request, env, corsHeaders);
  }

  // PUT /api/customers/:id - Update customer (Admin only)
  if (method === 'PUT' && pathParts.length === 4) {
    const customerId = pathParts[3];
    return updateCustomer(request, env, customerId, corsHeaders);
  }

  // DELETE /api/customers/:id - Delete customer (Super Admin only)
  if (method === 'DELETE' && pathParts.length === 4) {
    const customerId = pathParts[3];
    return deleteCustomer(request, env, customerId, corsHeaders);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Get all customers (Admin only)
async function getAllCustomers(request, env, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { results } = await env.DB.prepare(
      'SELECT * FROM customers ORDER BY created_at DESC'
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

// Get single customer (Admin only)
async function getCustomer(request, env, customerId, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const customer = await env.DB.prepare(
      'SELECT * FROM customers WHERE id = ?'
    ).bind(customerId).first();

    if (!customer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { results: orders } = await env.DB.prepare(
      'SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC'
    ).bind(customerId).all();

    return new Response(JSON.stringify({ success: true, data: { ...customer, orders } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Create new customer (Admin only)
async function createCustomer(request, env, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    if (!data.name || !data.email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO customers (name, email, company, phone, country, address, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.name,
      data.email,
      data.company || null,
      data.phone || null,
      data.country || null,
      data.address || null,
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
      return new Response(JSON.stringify({ error: 'Email already exists' }), {
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

// Update customer (Admin only)
async function updateCustomer(request, env, customerId, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    let updates = [];
    let params = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }
    if (data.email !== undefined) {
      updates.push('email = ?');
      params.push(data.email);
    }
    if (data.company !== undefined) {
      updates.push('company = ?');
      params.push(data.company);
    }
    if (data.phone !== undefined) {
      updates.push('phone = ?');
      params.push(data.phone);
    }
    if (data.country !== undefined) {
      updates.push('country = ?');
      params.push(data.country);
    }
    if (data.address !== undefined) {
      updates.push('address = ?');
      params.push(data.address);
    }
    if (data.is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(data.is_active ? 1 : 0);
    }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(customerId);

    const query = `UPDATE customers SET ${updates.join(', ')} WHERE id = ?`;
    await env.DB.prepare(query).bind(...params).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), {
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

// Delete customer (Super Admin only)
async function deleteCustomer(request, env, customerId, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare('DELETE FROM customers WHERE id = ?').bind(customerId).run();

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
