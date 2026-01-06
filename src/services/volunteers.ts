import { COLLECTIONS, ID, tablesDB } from "@/lib/appwrite";

export interface VolunteerApplicationData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    positionOfInterest: string,
    reasonForJoining: string,
}

export async function submitVolunteerApplication(data: VolunteerApplicationData) {
    console.log("Submitting volunteer application:", data);
    return await tablesDB.createRow({
        databaseId: '694833c6000376aef6f7',
        tableId: COLLECTIONS.VOLUNTEERS,
        rowId: ID.unique(),
        data: {

            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            positionOfInterest: "data.positionOfInterest",
            reasonForJoining: data.reasonForJoining,
            createdAt: new Date().toISOString(),
        },
    });
}


