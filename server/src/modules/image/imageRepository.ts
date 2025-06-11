import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Image } from "../../types/express/index";

class ImageRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from image");

    return rows as (typeof Image)[];
  }
}

export default new ImageRepository();
