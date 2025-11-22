import { Context } from "elysia";
import db from "../db/client";
import { loginSessions, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { StatusCode, User } from "../types";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

const loginController = async ({ body, set }: Context) => {
    try {
        const { email, password } = body as { email: string, password: string }
        const userFound: User | any = await db.select().from(users).where(eq(users.email, email))
        set.status = StatusCode.NOT_FOUND
        if (!userFound) {
            return {
                message: "No user associated with that email"
            }
        }
        if (userFound[0].password != password) {
            set.status = StatusCode.UNAUTHORIZED
            return {
                message: "invalid credentials"
            }
        }
        const id=Number(userFound[0].id) as number;
        const refreshToken=await generateRefreshToken(userFound[0]) as string
        const accessToken=await generateAccessToken(userFound[0])
        const inserted=await db.insert(loginSessions).values({
            userId:id,
            refreshToken:refreshToken
        }).returning();
        if(!inserted){
            set.status=StatusCode.BAD_REQUEST
            return{
                message:"error while generating new login sessions"
            }
        }
        console.log(inserted)
        set.status = StatusCode.SUCCESS
        return {
            message: "user found",
            accessToken,
            refreshToken
        }
    } catch (error) {
        set.status = StatusCode.INTERNAL_ERROR
        return {
            message: "error while logging in"
        }
    }
}
export default loginController;