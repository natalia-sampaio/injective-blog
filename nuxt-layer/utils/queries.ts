export const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body[0], categories}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
