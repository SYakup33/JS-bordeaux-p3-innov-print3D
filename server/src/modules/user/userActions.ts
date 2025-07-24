import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const existingUser = await userRepository.findByEmail(req.body.email);

    if (existingUser) {
      res.status(StatusCodes.CONFLICT).json({
        error: "Un utilisateur avec cet email existe déjà.",
      });
      return;
    }

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      street: req.body.street,
      zip_code: req.body.zip_code,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      hashed_password: req.body.hashed_password,
      role: "client",
    };

    const insertId = await userRepository.create(user);

    if (insertId === 0) {
      res.status(StatusCodes.UNAUTHORIZED);
    } else res.status(StatusCodes.CREATED).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  const userSchema = Joi.object({
    firstname: Joi.string().min(2).required().messages({
      "string.base": "Le prénom doit être une chaîne de caractères.",
      "string.min": "Le prénom doit contenir au moins 2 caractères.",
      "string.empty": "Le prénom ne peut pas être vide.",
      "any.required": "Le prénom est requis.",
    }),
    lastname: Joi.string().min(2).required().messages({
      "string.base": "Le prénom doit être une chaîne de caractères.",
      "string.min": "Le nom doit contenir au moins 2 caractères.",
      "string.empty": "Le nom ne peut pas être vide.",
      "any.required": "Le nom est requis.",
    }),
    street: Joi.string().min(2).required().messages({
      "string.base": "La voie doit être une chaîne de caractères.",
      "string.min": "La voie doit contenir au moins 2 caractères.",
      "string.empty": "La voie ne peut pas être vide.",
      "any.required": "La voie est requise.",
    }),
    zip_code: Joi.string()
      .pattern(/^\d{5}$/)
      .messages({
        "string.pattern.base":
          "Le code postal doit contenir exactement 5 chiffres.",
        "string.empty": "Le code postal ne peut pas être vide.",
      }),
    city: Joi.string().min(2).required().messages({
      "string.base": "La commune doit être une chaîne de caractères.",
      "string.min": "La commune doit contenir au moins 2 caractères.",
      "string.empty": "La commune ne peut pas être vide.",
      "any.required": "La commune est requise.",
    }),
    country: Joi.string().min(2).required().messages({
      "string.base": "Le pays doit être une chaîne de caractères.",
      "string.min": "Le pays doit contenir au moins 2 caractères.",
      "string.empty": "Le pays ne peut pas être vide.",
      "any.required": "Le pays est requis.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "L'adresse email n'est pas valide.",
      "string.empty": "L'adresse email ne peut pas être vide.",
      "any.required": "L'adresse email est requise.",
    }),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Le numéro de téléphone doit contenir exactement 10 chiffres.",
        "string.empty": "Le numéro de téléphone ne peut pas être vide.",
        "any.required": "Le numéro de téléphone est requis.",
      }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial.",
        "string.empty": "Le mot de passe ne peut pas être vide.",
        "any.required": "Le mot de passe est requis.",
      }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Les mots de passe ne correspondent pas.",
      "any.required": "La confirmation du mot de passe est requise.",
    }),
  });

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  res.status(StatusCodes.BAD_REQUEST).json({
    error: "Paramètre(s) invalide(s)",
    details: error.details.map((detail) => ({
      field: detail.context?.key,
      message: detail.message,
    })),
  });
};

const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub);

    const user = await userRepository.findById(userId);

    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Utilisateur non trouvé" });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub);

    const updates = {
      id: userId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      street: req.body.street,
      city: req.body.city,
      zip_code: req.body.zip_code,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
    };

    await userRepository.update(userId, updates);
    const updatedUser = await userRepository.findById(userId);
    res.status(StatusCodes.OK).json({
      updatedUser,
      message: "les informations ont bien été mises à jour",
    });
  } catch (err) {
    next(err);
  }
};

export default { validate, add, getProfile, updateProfile };
