export function createSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const uniqueSuffix = Math.random().toString(36).substring(2, 6);

  return `${baseSlug}-${uniqueSuffix}`;
}
