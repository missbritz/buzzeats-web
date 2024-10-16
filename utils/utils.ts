import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * 
 * @param str String to convert to slug
 * @returns {string}
 * Source: https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n#comment-2689a
 */
export function slugify(str:string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing spaces
  str = str.toLowerCase(); // convert to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
  .replace(/\s+/g, '-') // collapse whitespace and replace by "-"
  .replace(/-+/g, '-'); // collapse dashes
  return str;
}