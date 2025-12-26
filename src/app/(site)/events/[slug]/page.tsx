import { client } from "@/sanity/lib/client";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

// Dynamic metadata for social media previews (WhatsApp, Twitter, LinkedIn, Facebook, etc.)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });

  if (!event) {
    return {
      title: "Etkinlik Bulunamadı",
    };
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  });
  
  const description = event.description 
    ? `${event.description.substring(0, 150)}${event.description.length > 150 ? '...' : ''}`
    : `${formattedDate} tarihinde ${event.location} konumunda gerçekleşecek etkinliğimize katılın!`;

  const imageUrl = event.image 
    ? urlFor(event.image).width(1200).height(630).url()
    : "https://startupvefinanstoplulugu.com/assets/images/club_logo.png";

  const pageUrl = `https://startupvefinanstoplulugu.com/events/${slug}`;

  return {
    title: event.title,
    description: description,
    
    // Open Graph - Facebook, LinkedIn, WhatsApp, Telegram, Discord, etc.
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      title: event.title,
      description: description,
      siteName: "Startup & Finans Topluluğu",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    
    // Twitter/X
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: description,
      images: [imageUrl],
      creator: "@startupvefinans",
    },

    // Additional metadata
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
