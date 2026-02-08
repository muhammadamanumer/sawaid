'use client'
import { COLLECTIONS, DATABASE_ID,  tablesDB } from "@/lib/appwrite";
import { ID } from "appwrite";

export interface VolunteerApplicationData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    positionId: string;
    country: string;
    dateOfBirth: string; // ISO date string
    qualification: string;
    currentOccupation: string;
    weeklyHours: number;
    skills?: string; // Optional
    volunteerExperience?: string; // Optional
    message?: string; // Optional
}


export async function submitVolunteerApplication(data: VolunteerApplicationData) {
    const rowId = ID.unique(); 
    console.log('Generated unique ID:', rowId);
    console.log("Submitting volunteer application:", data);
    
    try {
        return await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.VOLUNTEERS,
            rowId,
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                positionId: data.positionId,
                country: data.country,
                dateOfBirth: data.dateOfBirth,
                qualification: data.qualification,
                currentOccupation: data.currentOccupation,
                weekyHours: data.weeklyHours, // Note: keeping DB field name as is (weekyHours)
                skills: data.skills || null,
                volunteerExperience: data.volunteerExperience || null,
                message: data.message || null,
            },
        });
    } catch (error: any) {
        console.error("Appwrite error submitting volunteer application:", error);
        // Re-throw with user-friendly message
        throw new Error(error.message || "Failed to submit volunteer application. Please try again.");
    }
}


