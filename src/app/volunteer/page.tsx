import { getVolunteerPositions } from '@/lib/appwrite-service';
import { VolunteerClient } from './volunteer-client';

export const revalidate = 60;

export default async function VolunteerPage() {
  const positions = await getVolunteerPositions();

  return <VolunteerClient positions={positions} />;
}
