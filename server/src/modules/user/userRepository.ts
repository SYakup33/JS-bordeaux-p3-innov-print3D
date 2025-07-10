import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: Omit<User, "id" | "created_at">) {
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
      "select * from user where email = ?",
      [email],
    );

    return rows[0] as User;
  }
}

export default new UserRepository();
