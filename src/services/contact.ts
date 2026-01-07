import { COLLECTIONS, DATABASE_ID, ID, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * CONTACT SERVICE
 * ============================================================================
 * 
 * Contact form submission handling.
 * Uses TablesDB.createRow() for write operations.
 * ============================================================================
 */

export interface ContactFormPostData {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    dateReceived: string;
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
            dateReceived: data.dateReceived,
        },
    });
}