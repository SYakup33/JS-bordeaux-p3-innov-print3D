import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";
import Joi from "joi";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      street: req.body.street,
      zip_code: req.body.zip_code,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };

    const insertId = await userRepository.create(newUser);

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
      "any.required": "Le prénom est requis.",
    }),
    lastname: Joi.string().min(2).required().messages({
      "string.min": "Le nom doit contenir au moins 2 caractères.",
      "any.required": "Le nom est requis.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "L'adresse email n'est pas valide.",
      "any.required": "L'email est requis.",
    }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un caractère spécial.",
        "any.required": "Le mot de passe est requis.",
      }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Les mots de passe ne correspondent pas.",
      "any.required": "La confirmation du mot de passe est requise.",
    }),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Le numéro de téléphone doit contenir exactement 10 chiffres.",
        "any.required": "Le numéro de téléphone est requis.",
      }),
    street: Joi.string().min(2).required().messages({
      "string.min": "La voie doit contenir au moins 2 caractères.",
      "any.required": "La voie est requise.",
    }),
    zip_code: Joi.string()
      .pattern(/^\d{5}$/)
      .messages({
        "string.pattern.base":
          "Le code postal doit contenir exactement 5 chiffres.",
      }),
    city: Joi.string().min(2).required().messages({
      "string.min": "La commune doit contenir au moins 2 caractères.",
      "any.required": "La commune est requise.",
    }),
  });

  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  res.status(StatusCodes.BAD_REQUEST).json({
    error: "Paramètre(s) invalide(s)",
  });
};

export default { add, validate };
