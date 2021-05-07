import dotenv from 'dotenv';

// calling .env.config() to get APP_PORT
dotenv.config()

// this will get the key from .env file
export const { 
     APP_PORT ,
     DEBUG_MODE,
     DB_URL,
     JWT_SECRET,
     REFRESH_SECRET
 }  = process.env;