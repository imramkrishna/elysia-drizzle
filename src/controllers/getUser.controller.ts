import { Context } from "elysia";
import db from "../db/client"
import { users } from "../db/schema"
import { StatusCode, User } from "../types";

const getUserController = async ({ set }: Context) => {
    try {
        const usersList: User[] = await db.select().from(users);
        set.status=StatusCode.SUCCESS
        return{
            message:"users fetched",
            users:usersList
        }
    } catch (error) {
        set.status = StatusCode.INTERNAL_ERROR
        return {
            message: "error while fethcing user"
        }
    }
}
export default getUserController