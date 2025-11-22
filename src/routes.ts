import dashboardController from "./controllers/dashboard.controller";
import loginController from "./controllers/login.controller";
import registerUserController from "./controllers/registerUser.controller";
import { apiRoute } from "./types";

const routes:apiRoute[]=[
    {
        path:"/login",
        method:"post",
        controller:loginController,
        isProtected:false
    },{
        path:"/getUsers",
        method:"get",
        controller:loginController,
        isProtected:false
    },{
        path:"/dashboard",
        method:"get",
        controller:dashboardController,
        isProtected:true
    },{
        path:"/registerUser",
        method:"post",
        controller:registerUserController,
        isProtected:false
    }
]
export default routes