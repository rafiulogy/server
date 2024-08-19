import { UserRole } from "../utils/types";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Forbidden", err });
      const user = await User.findOne({ where: { uuid: decoded?.uuid } });
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      next();
    }
  );
};

export const authorization = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (roles.includes(req.user.role as UserRole)) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
};
