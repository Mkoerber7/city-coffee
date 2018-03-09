INSERT INTO carts (user_id, product_id, cart_quantity)
VALUES ($1, $2, $3)
RETURNING *;