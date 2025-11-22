import jwt from 'jsonwebtoken';
import { StatusCode } from '../types';
import { Context, status } from 'elysia';
import { config } from "dotenv";
config();
const jwtkey = process.env.JWT_SECRET as string
export interface checkToken{
    status:boolean,
    user?:any,
    token?:string
}
export const generateAccessToken = async (data: any):Promise<string> => {
    if (!jwtkey) {
        throw new Error("No jwt key associated for token generations")
    }
        const token = jwt.sign(data, jwtkey, { expiresIn: '15m' })
        return token;
}
export const generateRefreshToken = async (data: any):Promise<string> => {
    if (!jwtkey) {
        throw new Error("No jwt key associated for token generation")
    }
        const token:string=await jwt.sign(data,jwtkey,{expiresIn:'7d'})
        if(!token){
            throw new Error("Error while generating refresh tokens")
        }
        return token
}
export const verifyAccessToken=async(token:string):Promise<checkToken>=>{
    try {
        const decoded=await jwt.verify(token,jwtkey);
        if(!decoded){
            return{
                status:false
            }
        }
        return {
            status:true,
            user:decoded
        };
    } catch (error) {
      return {
        status:false
      };
    }
}
export const verifyRefreshToken=async(token:string):Promise<boolean>=>{
    try {
        const decoded=await jwt.verify(token,jwtkey);
        if(!decoded){
            return false
        }
        return true
    } catch (error) {
        return false;
    }
}