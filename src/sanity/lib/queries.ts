import { groq } from "next-sanity";

// Get all posts
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  titleEn,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  excerptEn,
  author,
  categories,
  readTime,
  readTimeEn
}`;

// Get a single post by slug
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  titleEn,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  excerptEn,
  author,
  categories,
  readTime,
  readTimeEn,
  body,
  bodyEn
}`;

// Get all partners
export const PARTNERS_QUERY = groq`*[_type == "partner" && isActive == true] {
  _id,
  name,
  logo,
  website,
  googleMapsUrl,
  discount,
  description,
  descriptionEn
}`;

// Get featured event (single)
export const FEATURED_EVENT_QUERY = groq`*[_type == "event" && isFeatured == true] | order(_createdAt desc)[0] {
  _id,
  title,
  titleEn,
  slug,
  date,
  location,
  locationLink,
  mapEmbedUrl,
  description,
  descriptionEn,
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
  titleEn,
  slug,
  date,
  location,
  locationLink,
  mapEmbedUrl,
  description,
  descriptionEn,
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
  roleEn,
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
  titleEn,
  slug,
  date,
  location,
  locationLink,
  mapEmbedUrl,
  description,
  descriptionEn,
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
  titleEn,
  slug,
  date,
  location,
  locationLink,
  mapEmbedUrl,
  description,
  descriptionEn,
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
    titleEn,
    slug,
    isFeatured
  },
  "latestEvent": *[_type == "event"] | order(isFeatured desc, date desc)[0] {
    title,
    titleEn,
    slug,
    isFeatured
  }
}`;
