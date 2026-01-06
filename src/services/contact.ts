import { COLLECTIONS, ID, tablesDB } from "@/lib/appwrite";
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
        databaseId: '694833c6000376aef6f7',
        tableId: COLLECTIONS.CONTACT_MESSAGES,
        rowId: ID.unique(),
        data: {
            fullName: data.fullName,
            email: data.email,
            subject: data.subject,
            message: data.message,
            dateReceived: data.dateRecieved,
        },
    });
}