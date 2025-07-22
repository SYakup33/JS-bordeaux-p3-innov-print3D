import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: Omit<User, "id" | "created_at" | "role">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (firstname, lastname, street, city, zip_code, country, email, phone, hashed_password, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.street,
        user.zip_code,
        user.city,
        user.country,
        user.email,
        user.phone,
        user.hashed_password,
        "client",
      ],
    );

    return result.insertId;
  }

  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User;
  }

  async findById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id, firstname, lastname, street, city, zip_code, country, email, phone, role, created_at 
       FROM user WHERE id = ?`,
      [id],
    );
    return rows[0] as User | null;
  }

  async update(
    id: number,
    userData: Partial<
      Omit<User, "id" | "role" | "created_at" | "hashed_password">
    >,
  ) {
    // Construction dynamique des colonnes à mettre à jour
    const fields = Object.keys(userData);
    if (fields.length === 0) return;

    const values = Object.values(userData);
    const setString = fields.map((field) => `${field} = ?`).join(", ");

    await databaseClient.query(`UPDATE user SET ${setString} WHERE id = ?`, [
      ...values,
      id,
    ]);
  }
}

export default new UserRepository();
