/**
 * Orders API Handler
 * Handles order management operations
 */

import { requireAuth, requireSuperAdmin } from '../../utils/auth';

export async function handleOrders(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // GET /api/orders - Get all orders (Admin only)
  if (method === 'GET' && pathParts.length === 3) {
    return getAllOrders(request, env, corsHeaders);
  }

  // GET /api/orders/:id - Get single order (Admin only)
  if (method === 'GET' && pathParts.length === 4) {
    const orderId = pathParts[3];
    return getOrder(request, env, orderId, corsHeaders);
  }

  // POST /api/orders - Create new order (Admin or public)
  if (method === 'POST' && pathParts.length === 3) {
    return createOrder(request, env, corsHeaders);
  }

  // PUT /api/orders/:id - Update order (Admin only)
  if (method === 'PUT' && pathParts.length === 4) {
    const orderId = pathParts[3];
    return updateOrder(request, env, orderId, corsHeaders);
  }

  // DELETE /api/orders/:id - Delete order (Super Admin only)
  if (method === 'DELETE' && pathParts.length === 4) {
    const orderId = pathParts[3];
    return deleteOrder(request, env, orderId, corsHeaders);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Get all orders (Admin only)
async function getAllOrders(request, env, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { results } = await env.DB.prepare(
      `SELECT o.*, c.name as customer_name_from_table, c.email as customer_email_from_table
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       ORDER BY o.created_at DESC`
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

// Get single order with items (Admin only)
async function getOrder(request, env, orderId, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const order = await env.DB.prepare(
      `SELECT o.*, c.name as customer_name_from_table, c.email as customer_email_from_table
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       WHERE o.id = ?`
    ).bind(orderId).first();

    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { results: items } = await env.DB.prepare(
      `SELECT oi.*, p.image_url as product_image
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?
       ORDER BY oi.id`
    ).bind(orderId).all();

    return new Response(JSON.stringify({ success: true, data: { ...order, items } }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Create new order (Admin or public)
async function createOrder(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.customer_name || !data.customer_email || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Customer name, email, and items are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate order number
    const date = new Date();
    const year = date.getFullYear();
    const { count } = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM orders WHERE strftime("%Y", created_at) = ?'
    ).bind(year.toString()).first();
    const orderNumber = `ORD-${year}-${String(count + 1).padStart(3, '0')}`;

    // Calculate total amount
    let totalAmount = 0;
    for (const item of data.items) {
      if (!item.product_id || !item.quantity || item.quantity <= 0) {
        return new Response(JSON.stringify({ error: 'Each item must have product_id and valid quantity' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Get product price
      const product = await env.DB.prepare(
        'SELECT name FROM products WHERE id = ?'
      ).bind(item.product_id).first();
      
      if (!product) {
        return new Response(JSON.stringify({ error: `Product ${item.product_id} not found` }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const unitPrice = item.unit_price || 0;
      const itemTotal = unitPrice * item.quantity;
      totalAmount += itemTotal;
    }

    // Create order
    const result = await env.DB.prepare(
      `INSERT INTO orders (order_number, customer_id, customer_name, customer_email, customer_company, total_amount, currency, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      orderNumber,
      data.customer_id || null,
      data.customer_name,
      data.customer_email,
      data.customer_company || null,
      totalAmount,
      data.currency || 'USD',
      data.status || 'pending',
      data.notes || null
    ).run();

    const orderId = result.meta.last_row_id;

    // Create order items
    for (const item of data.items) {
      const product = await env.DB.prepare(
        'SELECT name FROM products WHERE id = ?'
      ).bind(item.product_id).first();
      
      const unitPrice = item.unit_price || 0;
      const itemTotal = unitPrice * item.quantity;
      
      await env.DB.prepare(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        orderId,
        item.product_id,
        product.name,
        item.quantity,
        unitPrice,
        itemTotal,
        item.notes || null
      ).run();
    }

    return new Response(JSON.stringify({
      success: true,
      data: { id: orderId, order_number: orderNumber }
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Update order (Admin only)
async function updateOrder(request, env, orderId, corsHeaders) {
  try {
    const admin = await requireAuth(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Build update query dynamically
    let updates = [];
    let params = [];

    if (data.customer_name !== undefined) {
      updates.push('customer_name = ?');
      params.push(data.customer_name);
    }
    if (data.customer_email !== undefined) {
      updates.push('customer_email = ?');
      params.push(data.customer_email);
    }
    if (data.customer_company !== undefined) {
      updates.push('customer_company = ?');
      params.push(data.customer_company);
    }
    if (data.total_amount !== undefined) {
      updates.push('total_amount = ?');
      params.push(data.total_amount);
    }
    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }
    if (data.notes !== undefined) {
      updates.push('notes = ?');
      params.push(data.notes);
    }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(orderId);

    const query = `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`;
    await env.DB.prepare(query).bind(...params).run();

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

// Delete order (Super Admin only)
async function deleteOrder(request, env, orderId, corsHeaders) {
  try {
    const admin = await requireSuperAdmin(request, env);
    if (!admin) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Super admin access required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare('DELETE FROM orders WHERE id = ?').bind(orderId).run();

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
