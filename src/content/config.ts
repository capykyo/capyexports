import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const worksCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    link: z.string().url().optional(),
    lang: z.enum(['zh', 'en', 'ja']).optional(), // Language code for the work
    // Additional fields for detail page
    website: z.string().url().optional(),
    platform: z.string().optional(),
    stack: z.string().optional(),
    blogpost: z.string().url().optional(),
    content: z.string().optional(), // Markdown content for detail page
  }),
});

export const collections = {
  works: worksCollection,
};
