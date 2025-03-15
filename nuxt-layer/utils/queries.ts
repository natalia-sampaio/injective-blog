export const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body[0], categories}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

export const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0]{
    featuredPosts[]->{
      _id,
      title,
      slug,
      image,
      publishedAt,
      categories,
      body[0]
    }
  }`;
