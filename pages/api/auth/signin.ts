import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
const prisma = new PrismaClient();
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    const authenticated = await bcrypt.compare(
      password,
      userWithEmail.password
    );

    if (authenticated) {
      const alg = "HS256";
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      const token = await new jose.SignJWT({
        email: userWithEmail.email,
      })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);

      setCookie("jwt", token, { req, res, maxAge: 86400 });

      return res.status(200).json({
        firstname: userWithEmail.first_name,
        lastname: userWithEmail.last_name,
        email: userWithEmail.email,
        phone: userWithEmail.phone,
        city: userWithEmail.city,
        token: token,
      });
    }

    return res
      .status(401)
      .json({ errorMessage: "email or password is invalid" });
  }
  return res.status(404).json("Unknown endpoint");
}
