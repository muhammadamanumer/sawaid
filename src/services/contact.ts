import { COLLECTIONS, DATABASE_ID, ID, tablesDB } from "@/lib/appwrite";
import { date } from "zod";

export interface ContactFormPostData {
    fullName: string, 
    email: string,
    subject: string,
    message: string,
    dateRecieved: string,
}

export async function submitContactForm(data: ContactFormPostData) {
    console.log("Submitting contact form:", data);
     return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTIONS.CONTACT,
        rowId: ID.unique(),
        data: {
            name: data.fullName,
            email: data.email,
            subject: data.subject,
            message: data.message,
            dateReceived: data.dateRecieved,
        },
    });
}