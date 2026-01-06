import { getPrograms } from '@/services/programs';
import { PathsClient } from './paths-client';
import { getPaths } from '@/services/path';

export const revalidate = 60;

export default async function PathsPage() {
  const [paths, programs] = await Promise.all([
    getPaths(),
    getPrograms(),
  ]);

  return <PathsClient paths={paths} programs={programs} />;
}
