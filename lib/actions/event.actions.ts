"use server"
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, UpdateEventParams, GetRelatedEventsByCategoryParams, GetEventsByUserParams } from "@/types"
import prisma from "../prisma"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"


export const createEvent = async({ event, userId, path}: CreateEventParams) => {
    try {
        const lister = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        })

        if(!lister){
            throw new Error("User Not Register")
        }
 
        console.log("kjfhjd")
        const newEvent = await prisma.event.create({
            data: {
                userId: userId,
                title: event.title,
                description: event.description,
                location: event.location,
                imageUrl: event.imageUrl,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                price: event.price,
                isFree: event.isFree,
                url: event.url,
                categoryId: event.categoryId
            }

            
        })

         
        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        
    }
}

export const getEventById = async(eventId: any)=>{
    try {
        
        const eventData = await prisma.event.findUnique({
            where: {
                id: JSON.parse(eventId)
            }
        })

        const eventUser = await prisma.user.findUnique({
            where: {
                clerkId: eventData?.userId
            }
        })

        if(!eventData){
            throw new Error("Event Not Found")
        }

        const event = {
            event: eventData,
            eventOrganizer: eventUser
        }

        return JSON.parse(JSON.stringify(event))
     

    } catch (error) {
        handleError(error)
    }
}

export const getAllEvents = async({query, limit=6, page, category}: GetAllEventsParams)=>{
    try {
        let eventData;
        
        // Query When Both query and category come
        if(query && query.trim() !== "" && category ){
            eventData = await prisma.event.findMany({
                where: {
                    AND: [
                        {
                            title: {
                                contains: query.trim()
                            }
                        },
                        {
                            categoryId: category
                        }
                       
                    ]
                },
                orderBy: {createdAt: "desc"},
                skip: 0,
                take: limit
            })
            // if search query avilable
        }else if(query && query.trim() !== "" && !category){
            eventData = await prisma.event.findMany({
                where: {
                    title: {
                        contains: query.trim()
                    }
                }, 
                orderBy: {createdAt : "desc"},
                skip: 0,
                take: limit
            })
        }
        // if only category is present
        else if(category){
            eventData = await prisma.event.findMany({
                where: {
                    categoryId: category
                },
                orderBy: {createdAt: "desc"},
                skip: 0,
                take: limit
            })
            // if there is no category
        }else if(!category){
            eventData = await prisma.event.findMany({
                orderBy: {createdAt: "desc"},
                skip: 0,
                take: limit
            })
        }

      
        
        if(!eventData){
            throw new Error("Event Not Found!")
        }

        const eventsWithUser = await Promise.all(eventData.map( async(event) => {
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: event.userId
                }
            })
     
            
            return { ...event, user }
        }))

        // total events
        const totalEvents = await prisma.event.count()

        return {
            data: eventsWithUser,
            totalPages: Math.ceil(totalEvents / limit)
        }
    } catch (error) {
        handleError(error)
    }
        
        
}

export const deleteEvent = async({eventId, path}: DeleteEventParams)=>{
    try {
        
        const event_id = parseInt(eventId) // becauce eventId is string 
        const deleteEvent = await prisma.event.delete({
            where: {
                id: event_id
            }
        })

        if (deleteEvent) return revalidatePath(path)
       

    } catch (error) {
        handleError(error)
    }
}

export const updateEvent = async({userId, event, path}: UpdateEventParams)=>{

    try {

        const eventId = parseInt(event.id)

        const eventToUpdate = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })

        console.log(eventToUpdate);
        
        if(!eventToUpdate || eventToUpdate.userId !== userId ) {
            throw new Error("Unauthorized or user not found!")
        }

        const updateEvent = await prisma.event.update({
            where: {
                id: eventId
            }, 
            data: {
                userId: userId,
                title: event.title,
                description: event.description,
                location: event.location,
                imageUrl: event.imageUrl,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                price: event.price,
                isFree: event.isFree,
                url: event.url,
                categoryId: event.categoryId
            }
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updateEvent))

        
    } catch (error) {
        handleError(error)
    }
}

export const getRelatedEventByCategory = async ({categoryId,eventId, limit=6, page=1 }:GetRelatedEventsByCategoryParams) =>{

    try {

        const eventID = parseInt(eventId) // we will look into it

         const eventsData = await prisma.event.findMany({
            where: {
                categoryId: categoryId,
                NOT: {
                    id: eventID
                }
            },
            orderBy: { createdAt: "desc"},
            skip: 0,
            take: limit,
        })
        
         
        // getting user for each event
        const eventWithUser = await Promise.all(eventsData.map(async(event) =>{
            const user =  await prisma.user.findUnique({
                where: {
                    clerkId: event.userId
                }
            }) 

            return {...event, user}
        }))

        const eventsCount = await prisma.event.count()

        return {data: JSON.parse(JSON.stringify(eventWithUser)), totalPages: Math.ceil(eventsCount / limit)}
    } catch (error) {
        handleError(error)
    }
}

export const getEventByUser = async ({ userId, limit=6 ,page }: GetEventsByUserParams) =>{ 
    try {
        
        const eventsData = await prisma.event.findMany({
            where: {
                userId: userId
            },
            orderBy: {createdAt: "desc"},
            skip: 0,
            take: limit
        })
        

        const eventWithUser = await Promise.all(eventsData.map(async(event) =>{
            const user =  await prisma.user.findUnique({
                where: {
                    clerkId: event.userId
                }
            }) 

            return {...event, user}
        }))

        const eventsCounts = await prisma.event.count()

        return { data: JSON.parse(JSON.stringify(eventWithUser)), totalPages: Math.ceil(eventsCounts / limit)}







        
    } catch (error) {
        handleError(error)
    }
}