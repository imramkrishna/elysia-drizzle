import { integer } from "drizzle-orm/pg-core";
import {pgTable,serial,text,timestamp } from "drizzle-orm/pg-core";
export const users=pgTable("users",{
    id:serial("id").notNull().primaryKey(),
    name:text("name").notNull(),
    email:text("email").notNull().unique(),
    password:text("password").notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow()
})

export const loginSessions=pgTable("login_sessions",{
    id:serial("id").primaryKey().notNull(),
    userId:integer("user_id").references(()=>users.id,{onDelete:"cascade"}).notNull(),
    refreshToken:text("refreshToken").notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull()
})