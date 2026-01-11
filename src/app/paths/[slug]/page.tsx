import { notFound } from "next/navigation";
import { getPathBySlug } from "@/services/path";
import { getProgramsByPathId } from "@/services/programs";
import { PathDetailClient } from "./path-detail-client";

export const revalidate = 60;

interface PathDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PathDetailPage({ params }: PathDetailPageProps) {
  const { slug } = await params;
  
  // Validate slug parameter
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    notFound();
  }

  const path = await getPathBySlug(slug);

  // If path doesn't exist or is inactive, show 404
  if (!path || !path.$id) {
    notFound();
  }

  // Fetch programs for this path - safely handle empty pathId
  const programs = path.$id ? await getProgramsByPathId(path.$id) : [];

  return <PathDetailClient path={path} programs={programs} />;
}
