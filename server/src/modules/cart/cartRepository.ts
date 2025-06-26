import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type CartProduct = {
  product_id: number;
  product_name: string;
  description: string;
  image_path: string;
  quantity: number;
  price: number;
};

class CartRepository {
  async findUserCartProducts(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT  
        c.product_id,
        c.quantity,
        p.name AS product_name ,
        p.description,
        p.price,
        MIN(i.path) AS image_path
      FROM cart c
      JOIN product p ON p.id = c.product_id
      LEFT JOIN image i ON i.product_id = p.id
      WHERE c.user_id = ?
      GROUP BY c.product_id 
      ORDER BY c.product_id ASC`,
      [userId],
    );
    return rows as CartProduct[];
  }
}

export default new CartRepository();
