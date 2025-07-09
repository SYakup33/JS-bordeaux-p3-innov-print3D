import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class AuthRepository {
  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User;
  }
}

export default new AuthRepository();
