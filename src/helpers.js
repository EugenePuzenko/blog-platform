import { format } from 'date-fns';

export const formatData = (createdAt) =>
  createdAt ? format(new Date(Date.parse(createdAt)), 'MMMM d, yyyy') : createdAt;

export const cutText = (movieDescr, limit) => {
  let text = movieDescr.trim();
  if (text.length <= limit) return text;

  text = text.slice(0, limit);
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace > 0) {
    text = text.substr(0, lastSpace);
  }
  return `${text} ...`;
};
