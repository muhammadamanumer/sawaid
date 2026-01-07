import { VolunteerClient } from './volunteer-client';

export const revalidate = 60;

export default async function VolunteerPage() {
  // Fetch positions client-side to leverage anonymous session
  return <VolunteerClient positions={[]} />;
}
