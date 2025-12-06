import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { config } from "../config";

const verify = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const barrier = req.headers.authorization;
      const token = barrier?.split(" ")[1];

      // console.log("token from verify middleware: ",barrier);

      if(!token){
        return res.status(403).json({
            success: false,
            message: "Valid token but insufficient permissions"
        })
      }


      const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;
      console.log("Decoded user from verify: ", decoded);
      
      // now puts on thats i create namespace
      req.user = decoded;

      if(roles.length && !roles.includes(decoded.role)){
        return res.status(403).json({
            success: true,
            message: "Valid token but insufficient permissions"
        })
      }

      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
        errors: err
      });
    }
  };
};

export default verify;
