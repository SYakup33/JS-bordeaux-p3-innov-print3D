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
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] as User;
  }

  async update(
    userId: number,
    user: Omit<User, "created_at" | "role" | "hashed_password">,
  ) {
    const [result] = await databaseClient.query(
      "   update user SET firstname = ?, lastname = ?, street = ?, city = ?, zip_code = ?, country = ?, email = ?, phone = ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.street,
        user.city,
        user.zip_code,
        user.country,
        user.email,
        user.phone,
        userId,
      ],
    );
    return result;
  }
}

export default new UserRepository();
