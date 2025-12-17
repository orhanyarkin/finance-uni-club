import { groq } from "next-sanity";

// Get all posts
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  author,
  categories,
  readTime
}`;

// Get a single post by slug
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  author,
  categories,
  readTime,
  body
}`;

// Get all partners
export const PARTNERS_QUERY = groq`*[_type == "partner" && isActive == true] {
  _id,
  name,
  logo,
  website,
  googleMapsUrl,
  discount,
  description
}`;

// Get featured event (single)
export const FEATURED_EVENT_QUERY = groq`*[_type == "event" && isFeatured == true] | order(_createdAt desc)[0] {
  _id,
  title,
  slug,
  date,
  location,
  locationLink,
  description,
  registrationLink,
  image,
  participants,
  category,
  status
}`;

// Get other events
export const EVENTS_QUERY = groq`*[_type == "event"] | order(date asc) {
  _id,
  title,
  slug,
  date,
  location,
  locationLink,
  description,
  registrationLink,
  image,
  participants,
  category,
  status
}`;

// Get team members
export const TEAM_QUERY = groq`*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  image,
  linkedin,
  twitter,
  committee,
  comingSoon,
  order
}`;

// Get ALL events for the events page
export const ALL_EVENTS_QUERY = groq`*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  location,
  locationLink,
  description,
  registrationLink,
  image,
  isFeatured,
  participants,
  category,
  status
}`;

// Get event by slug
export const EVENT_BY_SLUG_QUERY = groq`*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  location,
  locationLink,
  description,
  registrationLink,
  image,
  category,
  participants,
  status
}`;

// Get latest content for Navbar
// Get latest content for Navbar (prioritize featured)
export const NAVBAR_CONTENT_QUERY = groq`{
  "latestPost": *[_type == "post" && defined(slug.current)] | order(isFeatured desc, publishedAt desc)[0] {
    title,
    slug,
    isFeatured
  },
  "latestEvent": *[_type == "event"] | order(isFeatured desc, date desc)[0] {
    title,
    slug,
    isFeatured
  }
}`;
