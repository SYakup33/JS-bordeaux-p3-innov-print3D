import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import adminOrdersRepository from "./adminOrdersRepository";

const readAll: RequestHandler = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 4;
    const offset = (page - 1) * limit;
    const orders = await adminOrdersRepository.findAll(limit, offset);
    const count = await adminOrdersRepository.count();
    const totalPage = Math.ceil(count / limit);

    res.json({
      orders,
      pagination: { count, currentPage: page, limit: limit, totalPage },
    });
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
    next(error);
  }
};

const unReadOrders: RequestHandler = async (req, res, next) => {
  try {
    const unreadOrders = await adminOrdersRepository.findunreadOrders();
    res.status(StatusCodes.OK).json(unreadOrders);
  } catch (error) {
    next(error);
  }
};

const isRead: RequestHandler = async (req, res, next) => {
  try {
    const orderId = Number(req.params.orderId);
    await adminOrdersRepository.findReadOrders(orderId);
    res.status(StatusCodes.OK).json({ message: "commande lue" });
  } catch (error) {
    next(error);
  }
};

export default { readAll, updateStatus, unReadOrders, isRead };
