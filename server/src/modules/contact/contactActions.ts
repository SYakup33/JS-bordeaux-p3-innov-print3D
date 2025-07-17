import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const send: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Les champs nom, email et message sont requis.",
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: { name, email, message },
    });
  } catch (err) {
    next(err);
  }
};

export default { send };
