import Elysia, { Context } from "elysia"
import { verifyAccessToken } from "../utils/tokens";
import { StatusCode } from "../types";

const checkAuthToken = new Elysia().derive(async ({ headers, set }: Context) => {
    const token = headers.authorization?.split(" ")[1];
    if (!token) {
        set.status = StatusCode.UNAUTHORIZED
        return {
            message: "Unauthorized. No token availiable"
        }
    }
    const verified = await verifyAccessToken(token)
    if (verified.status == true) {
        set.status=StatusCode.SUCCESS
        return {
            user: verified.user
        }
    } else {
        set.status=StatusCode.UNAUTHORIZED
        return {
            message: "Invalid access token."
        }
    }
}).as("scoped")

const checkAuth = new Elysia()
    .use(checkAuthToken)
    .guard({
        beforeHandle({user,set}:any) {
            if(!user){
                set.status=-StatusCode.UNAUTHORIZED
                return {
                    message:"unauthorized."
                }
            }
        }
    })
    .as("scoped")
export default checkAuth