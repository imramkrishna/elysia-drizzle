import { Context } from "elysia";

const loginController=async({body,set}:Context)=>{
    const {email,password}=body as {email:string,password:string}
    return{
    }
}
export default loginController;