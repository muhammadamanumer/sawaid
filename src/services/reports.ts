import { ReportDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * REPORTS SERVICE
 * ============================================================================
 * 
 * Annual reports and financial transparency documents.
 * ============================================================================
 */

// ============ GET PUBLISHED REPORTS ============
export async function getReports(): Promise<ReportDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.REPORTS,
            queries: [
                Query.equal('isPublished', true),
                Query.orderDesc('year'),
                Query.limit(20),
            ],
        });
        return response.rows as unknown as ReportDocument[];
    } catch (error) {
        console.error('Error fetching reports:', error);
        return [];
    }
}

// ============ GET REPORTS BY TYPE ============
export async function getReportsByType(reportType: string): Promise<ReportDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.REPORTS,
            queries: [
                Query.equal('reportType', reportType),
                Query.equal('isPublished', true),
                Query.orderDesc('year'),
                Query.limit(20),
            ],
        });
        return response.rows as unknown as ReportDocument[];
    } catch (error) {
        console.error('Error fetching reports by type:', error);
        return [];
    }
}

// ============ GET LATEST ANNUAL REPORT ============
export async function getLatestAnnualReport(): Promise<ReportDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.REPORTS,
            queries: [
                Query.equal('reportType', 'annual'),
                Query.equal('isPublished', true),
                Query.orderDesc('year'),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as ReportDocument) || null;
    } catch (error) {
        console.error('Error fetching latest annual report:', error);
        return null;
    }
}

// ============ GET REPORT BY YEAR ============
export async function getReportByYear(year: number): Promise<ReportDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.REPORTS,
            queries: [
                Query.equal('year', year),
                Query.equal('isPublished', true),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as ReportDocument) || null;
    } catch (error) {
        console.error('Error fetching report by year:', error);
        return null;
    }
}
