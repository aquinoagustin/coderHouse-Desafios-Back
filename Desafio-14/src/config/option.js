import dotenv from "dotenv";

dotenv.config();

export const options = {
    server:{
        PORT: process.env.PORT
    },
    gmail:{
    adminAccount: process.env.ADMIN_EMAIL,
    adminPass: process.env.ADMIN_PASS
    }
}