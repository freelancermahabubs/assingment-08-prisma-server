import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    expires_in: process.env.EXPIRES_IN,
  },
};
