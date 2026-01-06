# Appwrite Setup Guide

This guide explains how to set up your Appwrite backend for the Sawaed Al-Islah platform using the automated script.

## 1. Create Appwrite Project
1.  Go to [Appwrite Cloud Console](https://cloud.appwrite.io/).
2.  Click **Create Project**.
3.  Name it `Sawaed Al-Islah Platform`.
4.  Copy the **Project ID** from the settings.

## 2. Generate API Key
1.  In your project dashboard, go to **Settings** (bottom left) -> **API Keys**.
2.  Click **Create API Key**.
3.  Name it `Setup Script`.
4.  **Important**: Select the following scopes:
    -   `collections.read`, `collections.write`
    -   `attributes.read`, `attributes.write`
    -   `indexes.read`, `indexes.write`
    -   `databases.read`, `databases.write`
    -   `buckets.read`, `buckets.write`
    -   `files.read`, `files.write`
5.  Copy the **API Key Secret**.

## 3. Configure Environment
Create or update your `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here
```

## 4. Run the Setup Script
Run the following command to automatically create the database, collections, attributes, permissions, and storage buckets:

```bash
npx tsx scripts/setup-appwrite.ts
```

## 5. Next Steps
Once the script completes successfully:
1.  Go to Appwrite Console -> **Databases**. You should see `sawaed_core`.
2.  Go to **Storage**. You should see `campaign-covers` and `gallery`.
3.  You are ready to integrate!

---
**Note**: This script uses `node-appwrite` SDK. If you encounter permissions errors, verify your API Key scopes.
