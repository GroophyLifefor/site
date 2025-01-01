import PreviewLink from '../../components/PreviewLink/PreviewLink';
import { cn } from '../../utils/lib';
import AttilaAlkoc from '../../assets/attilaalkoc.jpg';
import OzgeAydin from '../../assets/ozgeaydin.jpg';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';

const attila = {
  name: 'Attila Alkoç',
  title: 'DevRel & Agile Coach & Agile Software Development Advocate',
  profileImage: AttilaAlkoc,
  linkedin: 'https://www.linkedin.com/in/attilaalkoc/',
  description:
    'I am an experienced Agile Coach and Agile Software Development Advocate for more than 10 years. At the beginning of my career I worked as a software developer following eXtreme Programming practices and principles. Later on I provided my services as a Scrum Master and Agile Coach in different domains such as retail, telecom, banking, education and more.',
};

const ozge = {
  name: 'Özge Aydın',
  title: 'Community Manager, Kommunity | Podcast Host @Community Management',
  profileImage: OzgeAydin,
  linkedin: 'https://www.linkedin.com/in/ozgeeaydiin/',
  description:
    'No Implemented Yet',
}

const MMVPs = [attila, ozge];

export default function Home() {
  return (
    <article
      className={cn([
        'transition-all duration-1000 px-4 py-8',
        'prose prose-sm sm:prose-base md:prose-xl ',
        'w-full sm:max-w-[420px] md:sm:max-w-[600px] lg:max-w-[800px] mx-auto',
      ])}
    >
      <Navbar />
      <h3 className=" bg-yellow-300 rounded-lg px-2 py-1">This Page Is Work In Process</h3>
      <h1 className="!mb-0 font-semibold">
        <span className="font-black">M</span>y{' '}
        <span className="font-black">M</span>ost{' '}
        <span className="font-black">V</span>aluable{' '}
        <span className="font-black">P</span>rofessionals
      </h1>
      <h4 className="!mt-0 !mb-0">
        The Most Valuable Names of the Industry in Türkiye
      </h4>
      <i>List order does not mean priority. </i>
      <p></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MMVPs.map((mmvp) => (
          <div
            key={mmvp.name}
            className="border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center bg-background text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-pointer"
          >
            <Image
              src={mmvp.profileImage}
              alt={mmvp.name}
              className="w-full max-w-24 h-auto rounded-full !m-0 border"
            />
            <h3 className="!mb-0 !mt-4 text-center transition-colors duration-300 group-hover:text-background">
              {mmvp.name}
            </h3>
          </div>
        ))}
      </div>
    </article>
  );
}
