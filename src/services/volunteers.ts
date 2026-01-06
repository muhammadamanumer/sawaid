'use client'
import { COLLECTIONS, DATABASE_ID,  tablesDB } from "@/lib/appwrite";
import { ID } from "appwrite";

export interface VolunteerApplicationData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    positionOfInterest: string,
    message: string,
}


export async function submitVolunteerApplication(data: VolunteerApplicationData) {
     const rowId = ID.unique(); 
console.log('Generated unique ID:', rowId);
    console.log("Submitting volunteer application:", data);
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTIONS.VOLUNTEERS,
        rowId,
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            positionId: data.positionOfInterest,
            message: data.message,
        },
    });
}


