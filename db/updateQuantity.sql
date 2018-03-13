UPDATE carts
WHERE user_id = $1
AND product_id = $2
SET quantity = $3;