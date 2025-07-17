import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
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

export default { send };
