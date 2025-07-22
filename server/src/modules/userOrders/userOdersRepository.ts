import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userOrdersRepository {
  async findByUserId(userId: number) {
    console.log("🔍 Recherche commandes pour userId:", userId);
    const [ordersByUser] = await databaseClient.query<Rows>(
      `SELECT 
              o.id as orderId,
              o.status,
              o.created_at as createdAt,
              op.product_id as productId,
              op.quantity,
              op.unit_price as unitPrice,
              p.name as productName,
              p.description as productDescription
            FROM orders o
            LEFT JOIN order_product op ON o.id = op.order_id
            LEFT JOIN product p ON op.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC`,
      [userId],
    );
    console.log("🔍 Commandes trouvées:", ordersByUser.length);
    console.log("🔍 Première commande:", ordersByUser[0]);

    return ordersByUser;
  }
}

export default new userOrdersRepository();
