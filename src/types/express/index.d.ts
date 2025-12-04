import { JwtPayload } from "jsonwebtoken";
// type declare file
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}