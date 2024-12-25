import React from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import PreviewLink from '../../../components/PreviewLink/PreviewLink';
import Navbar from '../../../components/Navbar/Navbar';
import { cn } from '../../../utils/lib';
import rehypeHighlight from 'rehype-highlight';
import '../../../styles/atom-one-dark.css';
import { redirect } from 'next/navigation';

async function extractMetadata(slug) {
  const filePath = path.join(process.cwd(), 'src/content', `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');

  // Simple regex patterns to match first instances
  const imageMatch = source.match(/!\[.*?\]\((.*?)\)/);
  const h1Match = source.match(/^# (.*?)$/m);
  const pMatch = source.match(/^(?!#)(.*?)$/m);

  return {
    image: imageMatch ? imageMatch[1] : null,
    title: h1Match ? h1Match[1] : null,
    description: pMatch ? pMatch[1].trim() : null,
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const { image, title, description } = await extractMetadata(slug);
    const { frontmatter } = await getMDXContent(slug);

    return {
      title: title || frontmatter?.title || 'Blog Post',
      description:
        description || frontmatter?.description || 'Read our latest blog post',
      openGraph: {
        title: title || frontmatter?.title || 'Blog Post',
        description:
          description ||
          frontmatter?.description ||
          'Read our latest blog post',
        images: [
          {
            url: image || '/default-og-image.jpg', // Provide a default OG image
            width: 1200,
            height: 630,
            alt: title || 'Blog post image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: title || frontmatter?.title || 'Blog Post',
        description:
          description ||
          frontmatter?.description ||
          'Read our latest blog post',
        images: [image || '/default-og-image.jpg'],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post',
    };
  }
}

// Component to render custom MDX elements
const components = {
  h1: (props) => <h1 suppressHydrationWarning {...props} />,
  h2: (props) => <h2 suppressHydrationWarning {...props} />,
  h3: (props) => <h3 suppressHydrationWarning {...props} />,
  h4: (props) => <h4 suppressHydrationWarning {...props} />,
  h5: (props) => <h5 suppressHydrationWarning {...props} />,
  h6: (props) => <h6 suppressHydrationWarning {...props} />,
  p: (props) => <p suppressHydrationWarning {...props} />,
  ul: (props) => <ul suppressHydrationWarning {...props} />,
  ol: (props) => <ol suppressHydrationWarning {...props} />,
  li: (props) => <li suppressHydrationWarning {...props} />,
  blockquote: (props) => <blockquote suppressHydrationWarning {...props} />,
  hr: () => <hr />,
  pre: (props) => (
    <pre className=" p-4 rounded-lg overflow-x-auto" suppressHydrationWarning {...props} />
  ),
  code: ({ className, ...props }) => <code suppressHydrationWarning {...props} />,
  a: (props) => <PreviewLink suppressHydrationWarning {...props} />,
  strong: (props) => <strong suppressHydrationWarning {...props} />,
};

// Function to get all available blog posts
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/content');
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}

// Function to read and compile MDX content
async function getMDXContent(slug) {
  try {
    const filePath = path.join(process.cwd(), 'src/content', `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return notFound();
    }

    const source = fs.readFileSync(filePath, 'utf8');

    const { content, frontmatter } = await compileMDX({
      source,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [rehypeHighlight],
          format: 'mdx',
        },
      },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error('Error reading or compiling MDX:', error);
    throw error;
  }
}

async function BlogPost({ params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const { content, frontmatter } = await getMDXContent(params.slug);

    return (
      <article
        className={cn([
          'transition-[opacity,transform,width,max-width,font-size,leading] duration-1000 px-4 py-8',
          'prose prose-sm sm:prose-base md:prose-xl ',
          'w-full sm:max-w-[420px] md:sm:max-w-[600px] lg:max-w-[800px] mx-auto',
        ])}
        suppressHydrationWarning 
      >
        <Navbar />
        {frontmatter?.title && (
          <h1 className="text-4xl font-bold mb-6">{frontmatter.title}</h1>
        )}
        {content}
      </article>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    return redirect('/blog/404');
  }
}

export default BlogPost;
