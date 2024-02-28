import config from "../config/authConfig";
import { sign, verify } from "jsonwebtoken";

export const createToken = (payload) => {
  const { secretKey, accessExpire, refreshExpire } = config;

  const access_token = sign({ ...payload, refresh: false }, secretKey, {
    expiresIn: accessExpire,
  });

  const refresh_token = sign({ ...payload, refresh: true }, secretKey, {
    expiresIn: refreshExpire,
  });

  return { access_token, refresh_token };
};

export const validateToken = (token) => {
  const { secretKey } = config;
  return verify(token, secretKey);
};
