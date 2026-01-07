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
  
  const path = await getPathBySlug(slug);

  if (!path) {
    notFound();
  }

  // Fetch programs for this path
  const programs = await getProgramsByPathId(path.$id);

  return <PathDetailClient path={path} programs={programs} />;
}
