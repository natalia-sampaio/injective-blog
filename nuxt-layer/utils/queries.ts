import groq from "groq";

export const METADATA_QUERY = groq`
  *[_type == "siteSettings"][0]
`;

export const HERO_QUERY = groq`
  *[_type == "featuredPosts"][0]{
    featuredPosts[]->{
      _id,
      title,
      slug,
      publishedAt,
      "imageUrl": image.asset->url,
      body[0],
      "tags": tags[]->title
    }
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post"]{
    _id,
    title,
    slug,
    publishedAt,
    "imageUrl": image.asset->url,
    body[0],
    "tags": tags[]->title
  }
`;

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    "imageUrl": image.asset->url,
    body[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "alt": alt
      }
    }
  }
`;

export const TAGS_QUERY = groq`
  *[_type == "tags"]{
    title,
    "slug": slug.current
  }
`;

export const FOOTER_QUERY = groq`
  *[_type == "footer"] | order(_updatedAt desc) [0]
`;
