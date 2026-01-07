import { getMediaAssets } from "@/services/media";
import { GalleryClient } from "./gallery-client";

export const revalidate = 60;

export default async function GalleryPage() {
  const mediaAssets = await getMediaAssets(100);

  return <GalleryClient mediaAssets={mediaAssets} />;
}
