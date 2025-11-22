import { Context } from "elysia"
import { StatusCode } from "../types"
import db from "../db/client"
import { users } from "../db/schema"

const registerUserController=async({set,body}:Context)=>{
    try {
        const {email,password,name}=body as {email:string,password:string,name:string}
        if(!email || !name || !password){
            set.status=StatusCode.BAD_REQUEST
            return {
                message:"All fields are required"
            }
        }
        const inserted=await db.insert(users).values({name,email,password}).returning();
        if(!inserted){
            set.status=StatusCode.BAD_REQUEST
            return{
                message:"Error while inserting user"
            }
        }
        set.status=StatusCode.SUCCESS
        return{
            message:"user inserted",
            user:inserted
        }
    } catch (error) {
        set.status=StatusCode.INTERNAL_ERROR
        return{
            message:"Error while registering user"
        }
    }
}
export default registerUserController