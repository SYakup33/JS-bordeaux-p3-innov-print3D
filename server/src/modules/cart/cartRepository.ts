import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Cart = {
  user_id: number;
  product_id: number;
  quantity: number;
  price: number;
};

type CartWithProducts = {
  user_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
  description: string;
  image_path: string;
  firstname: string;
};

class CartRepository {
  // The C of CRUD - Create operation

  async create(cart: Cart) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into cart (user_id, product_id, quantity, price) values (?, ?, ?, ?)",
      [cart.user_id, cart.product_id, cart.quantity, cart.price],
    );

    // Return the ID of the newly inserted item
    return result.affectedRows;
  }

  // The Rs of CRUD - Read operations

  async find(userId: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from cart where user_id = ?",
      [userId],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Cart;
  }

  async findAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from cart");

    // Return the array of items
    return rows as Cart[];
  }
  async readCartWithProducts(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        c.user_id, 
        c.product_id,
        c.quantity,
        p.name AS product_name ,
        p.description,
        p.price,
        u.firstname,
        MIN(i.path) AS image_path
      FROM cart c
      JOIN product p ON p.id = c.product_id
      LEFT JOIN image i ON i.product_id = p.id
      JOIN user u ON u.id = c.user_id
      WHERE c.user_id = ?
      GROUP BY c.product_id 
      ORDER BY c.product_id ASC`,
      [userId],
    );
    return rows as CartWithProducts[];
  }
}

export default new CartRepository();
