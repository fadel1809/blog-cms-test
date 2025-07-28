export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric
    .replace(/(^-|-$)+/g, ''); // remove trailing/leading dashes
}