import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "innov.print.3d33@gmail.com",
    pass: "xrlvoeisrpwyfdmp",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const send: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;

    if (!firstname || !lastname || !email || !phone || !message) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "Les champs prénom, nom, email, téléphone et message sont requis.",
      });
      return;
    }

    const confirmationMail = {
      from: '"Service Client InnovPrint3D" <innov.print.3d33@gmail.com>',
      to: email,
      subject: "Confirmation de réception de votre message",
      text: `Bonjour ${firstname},

        Nous avons bien reçu votre message et nous vous recontacterons dans les plus brefs délais.

        Voici un rappel des informations que vous nous avez envoyées :
        Prénom : ${firstname}
        Nom : ${lastname}
        Email : ${email}
        Téléphone : ${phone}
        Message : ${message}

        Merci de votre confiance,
        L'équipe d'InnovPrint3D`,
    };

    const adminMail = {
      from: '"InnovPrint3D" <innov.print.3d33@gmail.com>',
      to: "innov.print.3d33@gmail.com",
      subject: "Nouveau message via le formulaire de contact",
      text: `Un utilisateur a envoyé un message :

        Prénom : ${firstname}
        Nom : ${lastname}
        Email : ${email}
        Téléphone : ${phone}
        Message : ${message}`,
    };

    await Promise.all([
      transporter.sendMail(confirmationMail),
      transporter.sendMail(adminMail),
    ]);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Message envoyé. Un email de confirmation a été envoyé.",
    });
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
      "string.base": "Le nom doit être une chaîne de caractères.",
      "string.min": "Le nom doit contenir au moins 2 caractères.",
      "string.empty": "Le nom ne peut pas être vide.",
      "any.required": "Le nom est requis.",
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
    message: Joi.string().min(2).required().messages({
      "string.base": "Le message doit être une chaîne de caractères.",
      "string.min": "Le message doit contenir au moins 2 caractères.",
      "string.empty": "Le message ne peut pas être vide.",
      "any.required": "Un message est requis.",
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

export default { validate, send };
