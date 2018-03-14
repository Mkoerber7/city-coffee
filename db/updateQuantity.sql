UPDATE carts
SET cart_quantity = $3
WHERE user_id = $1
AND product_id = $2;

SELECT carts.product_id, carts.cart_quantity, products.name, products.img_url, products.price
FROM products
JOIN carts
ON products.id = carts.product_id
WHERE carts.user_id = $1;
