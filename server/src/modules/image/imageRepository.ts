import databaseClient from "../../../database/client";

import type { Result } from "../../../database/client";

class ImageRepository {
  async add(image: Omit<ImageManagement, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO image (path, product_id)
       VALUES (?, ?)`,
      [image.path, image.product_id],
    );
    return result.insertId;
  }

  async deleteByProductId(productId: number) {
    await databaseClient.query("DELETE FROM image WHERE product_id = ?", [
      productId,
    ]);
  }

  async update(image: ImageManagement) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE image
      SET path = ?, product_id = ?`,
      [image.path, image.product_id],
    );

    return result.affectedRows;
  }
}
export default new ImageRepository();
