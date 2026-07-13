import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port:process.env.PORT,
    database_Url: process.env.DATABASE_URL,  
    bcrypt_Salt_Rounds: process.env.BCRYPT_SALT_ROUNDS,
    app_url: process.env.APP_URL,
    jwt_Secret: process.env.JWT_SECRET,
    jwt_access_Token: process.env.JWT_ACCESS_TOKEN,
    jwt_refresh_Token: process.env.JWT_REFRESH_TOKEN,
    jwt_access_Token_Expires_In: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwt_refresh_Token_Expires_In: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
}