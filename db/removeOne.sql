SELECT * FROM carts
WHERE user_id = $1;
DELETE FROM carts
WHERE product_id = $2