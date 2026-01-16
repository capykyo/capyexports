import { defineCollection, z } from 'astro:content';

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = {
  works: worksCollection,
};
