/**
 * Favorites API Handler
 * Handles product favorites/wishlist operations
 */

export async function handleFavorites(request, env, corsHeaders) {
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split('/').filter(Boolean);

  // GET /api/favorites?email=xxx - Get favorites by email
  if (method === 'GET' && pathParts.length === 3) {
    const email = url.searchParams.get('email');
    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return getFavorites(request, env, email, corsHeaders);
  }

  // POST /api/favorites - Add to favorites
  if (method === 'POST' && pathParts.length === 3) {
    return addFavorite(request, env, corsHeaders);
  }

  // DELETE /api/favorites - Remove from favorites
  if (method === 'DELETE' && pathParts.length === 3) {
    return removeFavorite(request, env, corsHeaders);
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Get favorites by email
async function getFavorites(request, env, email, corsHeaders) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT pf.*, p.name, p.description, p.image_url, p.category_id, c.name as category_name
       FROM product_favorites pf
       LEFT JOIN products p ON pf.product_id = p.id
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE pf.customer_email = ?
       ORDER BY pf.created_at DESC`
    ).bind(email).all();

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

// Add to favorites
async function addFavorite(request, env, corsHeaders) {
  try {
    const data = await request.json();

    if (!data.email || !data.product_id) {
      return new Response(JSON.stringify({ error: 'Email and product_id are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await env.DB.prepare(
      'INSERT INTO product_favorites (customer_email, product_id) VALUES (?, ?)'
    ).bind(data.email, data.product_id).run();

    return new Response(JSON.stringify({
      success: true,
      data: { id: result.meta.last_row_id }
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({ error: 'Product already in favorites' }), {
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

// Remove from favorites
async function removeFavorite(request, env, corsHeaders) {
  try {
    const data = await request.json();

    if (!data.email || !data.product_id) {
      return new Response(JSON.stringify({ error: 'Email and product_id are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await env.DB.prepare(
      'DELETE FROM product_favorites WHERE customer_email = ? AND product_id = ?'
    ).bind(data.email, data.product_id).run();

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
