import { getContentDateTimestamp } from "../../lib/content/date-utils";

// Ensure 'cx' is defined only once
export const cx = (...classNames) => classNames.filter(Boolean).join(' ');

// Ensure 'sortBlogs' uses consistent types
export const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    const dateA = getContentDateTimestamp(a.updatedAt || a.publishedAt);
    const dateB = getContentDateTimestamp(b.updatedAt || b.publishedAt);
    return dateB - dateA;
  });
}
