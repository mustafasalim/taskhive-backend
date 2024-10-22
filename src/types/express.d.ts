import { JwtPayload } from "jsonwebtoken"

// Express'in Request arayüzünü global olarak genişletiyoruz
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload // req.user özelliği burada tanımlanıyor
    }
  }
}
