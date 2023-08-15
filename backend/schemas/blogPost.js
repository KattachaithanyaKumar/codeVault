export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: "banner",
      title: "Banner",
      type: "image",
      options: {
        hotspot: true,
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short description of the blog post.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: "block",
        },
        {
          type: "object",
          name: "code",
          title: "CodeSnippet",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  {title: "javascript", value: "javascript"},
                  {title: "java", value: "java"},
                  {title: "bash", value: "bash"},
                  {title: "html", value: "html"},
                  {title: "css", value: "css"},
                ],
              },
            },
            {
              name: "code",
              title: "Code",
              type: "text",
            },
          ],
          preview: {
            select: {
              language: "language",
            },
            prepare({language}) {
              return {
                title: language,
              };
            },
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          }
        }
      ],
    },
  ],
};
