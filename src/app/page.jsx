import PreviewLink from '../components/PreviewLink/PreviewLink';
import { cn } from '../utils/lib';

const blogs = [
  {
    title: 'I Tried To Learn Vue/Nuxt But...',
    slug: 'I-tried-vue-but',
  },
]

export default function Home() {
  return (
    <article
      className={cn([
        'transition-all duration-1000 px-4 py-8',
        'prose prose-sm sm:prose-base md:prose-xl ',
        'w-full sm:max-w-[420px] md:sm:max-w-[600px] lg:max-w-[800px] mx-auto',
      ])}
    >
      <h1 className="!mb-0">Murat Kirazkaya</h1>
      <h2 className="!mt-0 !mb-2">Software Engineer</h2>
      <h4 className="!mt-0">I code, do you?</h4>
      <p></p>
      <h4>Blogs</h4>
      <ul>
        {
          blogs.map(blog => (
            <li className="!my-0" key={blog.slug}>
              <PreviewLink href={`/blog/${blog.slug}`} target="_self">
                {blog.title}
              </PreviewLink>
            </li>
          ))
        }
      </ul>
      <h4>Projects</h4>
      <ul>
        <li>
          <PreviewLink href="https://aad-ext.vercel.app/">
            AAD - Highly Customizable GitHub
          </PreviewLink>
        </li>
      </ul>
    </article>
  );
}
