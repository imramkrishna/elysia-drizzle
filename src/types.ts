import { Context } from "elysia"

export enum StatusCode{
    SUCCESS = 200,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401
}

export type httpMethods="get" | "post" | "patch" | "put" | "delete" | "options"

export interface apiRoute{
    path:string,
    method:httpMethods,
    controller:(data:Context)=>{},
    isProtected:boolean
}
export interface User{
    name:string,
    email:string,
    password:string
}