import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class suggestionsRepository {
  async findById(productId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM product WHERE id = ?",
      [productId],
    );
    return rows[0];
  }

  async findBysuggestions({
    categoryId,
    currentId,
    minPrice,
    maxPrice,
  }: SuggestedProducts) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT p.*, cat.name as category_name FROM product p LEFT JOIN category cat ON p.category_id = cat.id WHERE p.category_id = ? AND p.id != ? AND p.price BETWEEN ? AND ?",
      [categoryId, currentId, minPrice, maxPrice],
    );

    for (const product of rows) {
      const [imgRows] = await databaseClient.query<Rows>(
        "select * from image WHERE product_id = ?",
        [product.id],
      );

      product.images = imgRows.map((img) => img.path);
    }

    return rows;
  }
}

export default new suggestionsRepository();
