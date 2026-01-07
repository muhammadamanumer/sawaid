import { getAllPosts } from "@/services/posts";
import { NewsClient } from "./news-client";

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getAllPosts();

  return <NewsClient posts={posts} />;
}
