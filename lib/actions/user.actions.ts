"use server"

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import prisma from "../prisma";

export async function createUser(user: CreateUserParams){

    console.log("user for createUser", user);
    

    try {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.clerkId,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastname: user.lastName,
                photo: user.photo
            }
        })

        console.log(newUser, "new User")

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }

}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {

    try {

        const updatedUser = await prisma.user.update({
            where: {
                clerkId: clerkId 
            },
            data: user 
        });

        return JSON.parse(JSON.stringify(updatedUser));
        
    } catch (error) {
        handleError(error)
    }

}

export async function getUserById(userId: number) {
    try {
  
        const user = await prisma.user.findUnique({
            where: {
                id: userId 
            }
        });
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
}


export const deleteUser = async (clerkId: string) => {

    try {

        await prisma.user.delete({
            where: {
                clerkId: clerkId 
            }
        });
        
    } catch (error) {
        handleError(error)
    }

}