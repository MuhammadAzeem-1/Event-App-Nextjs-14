
"use server"
import prisma from "../prisma"
import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"

export const createCategory = async({categoryName}: CreateCategoryParams) => {
    try {
    const newCategory = await prisma.category.create({
        data:{
           name: categoryName
        }
    })

    return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async() => {
    try {
    const allCategories = await prisma.category.findMany()

    return JSON.parse(JSON.stringify(allCategories))
    } catch (error) {
        handleError(error)
    }
}