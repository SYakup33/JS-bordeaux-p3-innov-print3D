import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userOrdersRepository {
  async findByUserId(userId: number) {
    const [ordersByUser] = await databaseClient.query<Rows>(
      "select * from orders where user_id = ?",
      [userId],
    );
  }
}

export default new userOrdersRepository();
