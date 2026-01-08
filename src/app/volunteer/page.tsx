import { VolunteerClient } from './volunteer-client';
import { getVolunteerPositions } from '@/services/volunteer-positions';

export const revalidate = 60;

export default async function VolunteerPage() {
  // Fetch positions server-side
  const positions = await getVolunteerPositions();
  
  return <VolunteerClient positions={positions} />;
}
