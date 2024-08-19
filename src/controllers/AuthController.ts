import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { sendResponseWithJwt } from "../utils/functions";
import { JwtPayload, verify } from "jsonwebtoken";
import Jwt from "../services/Jwt";
import SendEamil from "../services/sendMail";

class AuthController {
  /**
   * login
   * method => post
   * /api/auth/login
   */
  public static async login(req: Request, res: Response) {
    const { mobile, password } = req.body;
    if (!mobile || !password)
      return res.status(400).json({ message: "Mobile or password missing" });

    try {
      const user = await User.findOne({ where: { mobile } });

      if (!user) {
        return res.status(400).json({ message: "Invalid mobile number" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      sendResponseWithJwt(res, user, `Hi ${user.name} user are loggged In!`);
    } catch (error) {
      return res.status(500).json({ message: "Try again later.", error });
    }
  }
  /**
   * signup
   * method => post
   * /api/auth/signup
   */
  public static async signup(req: Request, res: Response) {
    const { name, mobile, password } = req.body;
    try {
      const user = User.create({
        name,
        mobile,
        password,
      });

      await user.save();
      res.json({
        message: "Account created successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Fail to create account!" });
    }
  }
  /**
   * logout
   * method => post
   * /api/auth/logout
   */
  public static async logout(req: Request, res: Response) {
    if (!req.cookies?.token) return res.sendStatus(204);

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: "You are logged out" });
  }

  /**
   * refresh
   * method => get
   * /api/auth/refresh
   */

  /**
   * System Admin
   * method => get
   * /api/auth/create-admin
   */

  /**
   * reset password
   * method => POST
   * /api/auth/reset-password
   * access => both
   */
}

export default AuthController;
