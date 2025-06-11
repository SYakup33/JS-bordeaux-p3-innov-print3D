import type { RequestHandler } from "express";

import imageRepository from "./imageRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const images = await imageRepository.readAll();
    res.json(images);
  } catch (err) {
    next(err);
  }
};

export default { browse };
