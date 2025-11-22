import { Context } from "elysia";
import { verifyAccessToken } from "../utils/tokens";
import { StatusCode } from "../types";

const dashboardController=async({headers,set}:Context)=>{
    try {
        const token=headers.authorization?.split(" ")[1] as string;
        const isVerified=await verifyAccessToken(token)
        if(!isVerified.status){
            set.status=StatusCode.UNAUTHORIZED
            return{
                message:"Invalid token"
            }
        }
        set.status=StatusCode.SUCCESS
        return{
            message:"Dashoboard fetched successfully",
            user:isVerified.user
        }

    } catch (error) {
        return{
            message:"Error while fetching dashboard"
        }
    }
}
export default dashboardController