import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import adminOrdersRepository from "./adminOrdersRepository";

const readAll: RequestHandler = async (req, res, next) => {
  try {
    const orders = await adminOrdersRepository.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const orderId = Number(req.params.orderId);
    const { status } = req.body;

    await adminOrdersRepository.updateStatus(orderId, status);
    res.status(StatusCodes.OK).json({ message: "status mis à jour" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur serveur lors de la mise à jour" });
  }
};

export default { readAll, updateStatus };
