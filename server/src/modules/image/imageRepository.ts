import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Product } from "../../types/express/index";

class ImageRepository {
  async add(image: Omit<ImageToInsert, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO image (path, product_id)
       VALUES (?, ?)`,
      [image.path, image.product_id],
    );
    return result.insertId;
  }
}
export default new ImageRepository();
