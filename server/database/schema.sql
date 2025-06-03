CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'admin') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE address (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  street VARCHAR(150) NOT NULL,
  city VARCHAR(150) NOT NULL,
  zip_code VARCHAR(25) NOT NULL,
  country VARCHAR(45) NOT NULL,
  user_id INT NOT NULL,   
  CONSTRAINT fk_address_user 
    FOREIGN KEY (user_id) 
    REFERENCES user (id)
);

CREATE TABLE category (
 id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
 name VARCHAR(45) NOT NULL);

CREATE TABLE product (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE cart (
  user_id INT NOT NULL,
  product_id INT NOT NULL,
    quantity INT NOT NULL,
  PRIMARY KEY (user_id, product_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES user (id),
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES product (id));

CREATE TABLE category_product (
  product_id INT NOT NULL,
  category_id INT NOT NULL,
  CONSTRAINT fk_category_product_product FOREIGN KEY (product_id) REFERENCES product (id),
  CONSTRAINT fk_category_product_category FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE favorite (
  user_id INT NOT NULL,
  product_id INT NOT  NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES user (id),
  CONSTRAINT fk_favorite_product FOREIGN KEY (product_id) REFERENCES product (id));

CREATE TABLE image (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  path VARCHAR(255) NOT NULL,
  CONSTRAINT fk_image_product FOREIGN KEY (product_id) REFERENCES product (id));

CREATE TABLE orders (
  order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL,
  user_id INT NOT NULL ,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES user (id));

CREATE TABLE order_product (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  CONSTRAINT fk_order_product_order FOREIGN KEY (order_id) REFERENCES orders (order_id),
  CONSTRAINT fk_order_product_product FOREIGN KEY (product_id) REFERENCES product (id));

CREATE TABLE review (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL ,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES user (id),
  CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES product (id));
