import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  if (!bearerToken) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  // const bearerToken = req.headers["authorization"] as string;
  // const token = bearerToken.split(" ")[1];
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  return res.status(200).json({ user });
}