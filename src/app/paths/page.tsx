import { getPaths, getPrograms } from '@/lib/appwrite-service';
import { PathsClient } from './paths-client';

export const revalidate = 60;

export default async function PathsPage() {
  const [paths, programs] = await Promise.all([
    getPaths(),
    getPrograms(),
  ]);

  return <PathsClient paths={paths} programs={programs} />;
}
