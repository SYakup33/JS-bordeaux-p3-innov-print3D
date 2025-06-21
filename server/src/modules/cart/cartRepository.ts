import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class cartRepository {
  async find(userId: number) {
    const [cartRows] = await databaseClient.query<Rows>(
      `SELECT p.id AS productId, p.name AS productName, p.description, p.price,
       cat.name AS categoryName,
       u.id AS userId,
       cart.quantity
       FROM cart
       JOIN product p ON cart.product_id = p.id
       jOIN user u ON cart.user_id = u.id
       LEFT JOIN category cat ON p.category_id = cat.id
       WHERE cart.user_id = ?
       ORDER BY p.id DESC`,
      [userId]
    );

    for (const product of cartRows) {
      const [imageRows] = await databaseClient.query<Rows>(
        `SELECT path
         FROM image
         WHERE product_id = ?`,
        [product.productId]
      );

      product.images = imageRows.map((img) => img.path);
    }

    return cartRows;
  }

  async updateCartQuantity( userId: number, productId: number, quantity: number) {
    const [updateRows] = await databaseClient.query(
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
      [quantity, userId, productId]
    );
    return updateRows;
  }

  async delete(userId: number, productId: number) {
    const [deleteRows] = await databaseClient.query(
      
      "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
    return deleteRows;
  }
}

export default new cartRepository();