import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  user: {
    email: process.env.USER_EMAIL,
    name: process.env.USER_NAME,
    stack: process.env.USER_STACK,
  },
  catFact: {
    url: process.env.CATFACT_URL,
    timeout: Number(process.env.CATFACT_TIMEOUT_MS),
  },
};
