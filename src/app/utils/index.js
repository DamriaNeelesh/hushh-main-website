import { compareDesc, parseISO } from 'date-fns';

// Ensure 'cx' is defined only once
export const cx = (...classNames) => classNames.filter(Boolean).join(' ');

// Ensure 'sortBlogs' uses consistent types
export const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.publishedAt);
    const dateB = new Date(b.updatedAt || b.publishedAt);
    return dateB - dateA;
  });
}