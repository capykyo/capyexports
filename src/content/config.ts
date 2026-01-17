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

const resumeCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resume' }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    xiaohongshu: z.string().url().optional(),
    lang: z.enum(['zh', 'en', 'ja']).optional(), // Language code for the resume
  }),
});

export const collections = {
  works: worksCollection,
  resume: resumeCollection,
};
