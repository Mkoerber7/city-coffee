INSERT INTO carts (user_id, product_id, quantity, total_price, individual_price)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;