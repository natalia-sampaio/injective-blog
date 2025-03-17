# Assignment from Injective Labs

## Table of Contents

-   [Description](#description)
-   [Tech Stack](#tech-stack)
-   [Choosing a Headless CMS](#choosing-a-headless-cms)
    1. [Defining Project Constraints](#defining-project-constraints)
    2. [Compiling Data](#compiling-data)
    3. [Conclusion](#conclusion)

## Description

Implement a mirror version of the [Injective Blog](https://blog.injective.com).

### Mandatory Features:

-   Home Page
-   A Single Blog Post Page

### Good-to-Have Features:

-   **Multi-Language Support:** The implementation should support blogs in more than one language.
-   **Social Sharing Meta Tags:** Blog post URLs should include social sharing meta tags, using the post’s featured image.

## Tech stack:

-   **Headless CMS:** [Sanity](#why-sanity)
-   Nuxt.js
-   Tailwind CSS
-   Nuxt UI
-   Composition API
-   TypeScript
-   **Deployment:** The application should be deployed to **Netlify with SSR enabled** (`ssr: true` for server-side rendering).

## Choosing A Headless CMS

When starting a new scalable project, selecting the right tools is crucial. In this case, choosing the best headless CMS is a key decision, but the market offers a vast array of options. For instance, [Jamstack site](https://jamstack.org) lists **126 different headless CMS solutions**.

### 1. Defining Project Constraints

Considering our tech stack—**Nuxt.js and Netlify with SSR enabled**—we can define specific constraints to guide our decision:

1.  API Availability & Response Speed

    Since **Nuxt SSR** fetches data **at request time**, the CMS must:

    -   Provide the **fastest API response times** possible.
    -   Offer **rate limits or caching mechanisms** to prevent slow SSR performance.

2.  Serverless-Friendly (for Netlify)

    Since **Netlify runs Nuxt SSR on serverless functions**, the CMS should:

    -   **Handle multiple API requests efficiently**.
    -   Work well with **cold starts** (serverless functions can be slow).
    -   Provide **caching options** to mitigate slow dynamic fetches.

3.  Support for SSG & SSR Rendering

    The CMS should support both SSG and SSR, as **hybrid rendering (ISR)** can improve performance. To meet this criterion, the CMS should:

    -   Include **Nuxt.js modules or, at the very least, an integration guide**.
        -   A **Nuxt module** is preferred over just a guide, as it provides built-in optimizations, auto-imports, and SSR-friendly features.
    -   Support **webhooks** to trigger static rebuilds when necessary.

4.  SEO Metadata Support

    The CMS should:

    -   Allow storing **SEO metadata** (title, description, OG tags).
    -   Deliver **structured content** (e.g., blog posts, categories).
    -   Support **image optimization** via a built-in API.

### 2. Compiling Data

We identified the **top 5 headless CMS platforms** based on [G2's ratings](https://www.g2.com/categories/headless-cms), sorted by **number of reviews (most to least)**.  
We also considered the **ease to use score** from [G2'S **Top 20 Easiest To Use Headless CMS Software**](https://www.g2.com/categories/headless-cms?rank=3&tab=easiest_to_use).

The table below presents these platforms, incorporating our defined constraints:

| CMS           | Rate Limits / Caching               | Netlify Integration | SSG & SSR Support | Nuxt module or guide | Webhooks | SEO Metadata Support | Image Optimization | **G2 Satisfaction Score (# of Reviews)** | **G2 Ease of Use Score (Rank)** |
| ------------- | ----------------------------------- | ------------------- | ----------------- | -------------------- | -------- | -------------------- | ------------------ | ---------------------------------------- | ------------------------------- |
| **Sanity**    | ✅ Real-time sync & global CDN      | ✅ Yes              | ✅ Yes            | Nuxt.js module       | ✅ Yes   | ✅ Yes               | ✅ Yes             | ⭐ **4.7 / 5** (**898 reviews**)         | **8.9 (#3 place)**              |
| **Umbraco**   | ✅ Caching available in cloud plans | ✅ Yes              | ✅ Yes            | ❌ None              | ✅ Yes   | ✅ Yes               | ✅ Yes             | ⭐ **4.5 / 5** (**779 reviews**)         | **8.9 (#2 place)**              |
| **Hygraph**   | ✅ Built-in caching and CDN         | ✅ Yes              | ✅ Yes            | Nuxt.js guide        | ✅ Yes   | ✅ Yes               | ✅ Yes             | ⭐ **4.5 / 5** (**566 reviews**)         | **8.8 (#4 place)**              |
| **Storyblok** | ✅ Built-in caching and CDN         | ✅ Yes              | ✅ Yes            | Nuxt.js module       | ✅ Yes   | ✅ Yes               | ✅ Yes             | ⭐ **4.5 / 5** (**458 reviews**)         | **8.9 (#1 place)**              |
| **Prismic**   | ✅ Built-in caching and CDN         | ✅ Yes              | ✅ Yes            | Nuxt.js module       | ✅ Yes   | ✅ Yes               | ✅ Yes             | ⭐ **4.3 / 5** (**303 reviews**)         | **8.6 (#5 place)**              |

### 3. Conclusion

**After defining our project constraints and evaluating the top headless CMS options, [Sanity](https://www.sanity.io/) emerges as the best choice.**

#### **Why Sanity?**

✅ **Meets all technical criteria**:

-   **Real-time API with built-in caching & CDN**, ensuring fast response times.
-   **Fully compatible with Netlify & Nuxt.js SSR**, enabling seamless integration.
-   Provides a **Nuxt.js module**, which simplifies implementation and optimizes performance.

✅ **Best in terms of user feedback**:

-   **Highest satisfaction score** (⭐ 4.7 / 5) among the top CMS options.
-   **Most reviewed CMS** (898 reviews), indicating strong adoption and community trust.
-   **High score in ease of use** (8.9), making it accessible for developers.

✅ **Developer-friendly & scalable**:

-   Built-in support for **structured content, SEO metadata, and image optimization**.
-   **Webhooks available**, allowing seamless content updates.
-   A wealth of **official documentation** makes it easy to learn, integrate and upgrade.

## Personal Opinions

-   Sanity: Learning Sanity was a smooth experience. There’s plenty of good documentation, and I never felt stuck. The most challenging part was embedding a YouTube video within the body of a post, but overall, it was an intuitive platform to work with.

-   Nuxt.js: Straightforward and fast. It made development efficient without unnecessary complexity.

-   Tailwind CSS: As easy as breathing. The utility-first approach makes styling quick and effortless.

-   Nuxt UI: This was my first time using Nuxt UI, and it was easy to pick up. It’s fast, has great performance, and provides solid accessibility features.

-   Composition API: Very easy, especially since I’m already used to it. It feels natural to work with.

-   TypeScript: No issues at all. I’m very familiar with it, so using it was seamless.

-   Netlify: Working with Netlify was a bit tricky at first, but after overcoming some initial hurdles, I now feel confident using the platform. One of the main challenges I faced was with the publish directory—I initially left it unset, assuming Netlify would automatically resolve it to `.output`, Nuxt's default build folder. However, Netlify requires this to be explicitly set to `dist` for the deployment to work correctly. Once I made that adjustment, the JavaScript files loaded properly in production.

---

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
