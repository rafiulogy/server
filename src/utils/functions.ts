import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../entity/User";
import Jwt from "../services/Jwt";

export const sendResponseWithJwt = (
  res: Response,
  user: User,
  message: string
) => {
  const payload: JwtPayload = {
    id: user.id,
    uuid: user.uuid,
    mobile: user.mobile,
    role: user.role,
  };
  const accessToken = Jwt.generateAccessToken(payload);
  const refreshToken = Jwt.generateRefreshToken(payload);

  res.cookie("token", refreshToken, {
    // maxAge: 24 * 60 * 60 * 1000, // 1d
    maxAge: 24 * 60 * 60 * 1000, // 1d
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
  });

  res.status(200).json({
    message: message,
    accessToken,
    user,
  });
};
