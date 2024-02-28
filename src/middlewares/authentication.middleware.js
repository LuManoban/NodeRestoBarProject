import { StatusCodes } from "http-status-codes";
import { validateToken } from "../helpers/jwt.helper";
import {
  AuthTokenValidateError,
  AuthorizationNotFound,
} from "../errors/auth.error";

export default (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthorizationNotFound();
    }

    const accessToken = authorization.split(" ")[1];
    const { user_id, refresh } = validateToken(accessToken);

    if (refresh) {
      throw new AuthTokenValidateError();
    }
    
    req.current_user = user_id;
    return next();
  } catch (error) {
    return res.status(error?.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
