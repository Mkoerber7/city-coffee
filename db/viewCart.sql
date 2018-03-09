SELECT carts.product_id, carts.cart_quantity, products.name, products.img_url, products.price
FROM products
JOIN carts
ON products.id = carts.product_id
WHERE carts.user_id = $1;