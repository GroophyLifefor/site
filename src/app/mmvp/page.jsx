'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

import PreviewLink from '../../components/PreviewLink/PreviewLink';
import Navbar from '../../components/Navbar/Navbar';
import { cn } from '../../utils/lib';

import AttilaAlkoc from '../../assets/attilaalkoc.jpg';
import OzgeAydin from '../../assets/ozgeaydin.jpg';

const MMVPs = [
  {
    name: 'Attila Alkoç',
    title: 'DevRel & Agile Coach & Agile Software Development Advocate',
    profileImage: AttilaAlkoc,
    linkedin: 'https://www.linkedin.com/in/attilaalkoc/',
    description:
      'I am an experienced Agile Coach and Agile Software Development Advocate for more than 10 years. At the beginning of my career I worked as a software developer following eXtreme Programming practices and principles. Later on I provided my services as a Scrum Master and Agile Coach in different domains such as retail, telecom, banking, education and more.',
  },
  {
    name: 'Özge Aydın',
    title: 'Community Manager, Kommunity | Podcast Host @Community Management',
    profileImage: OzgeAydin,
    linkedin: 'https://www.linkedin.com/in/ozgeeaydiin/',
    description: 'No Implemented Yet',
  }
];

export default function Home() {
  const [selectedMMVP, setSelectedMMVP] = useState(null);

  return (
    <article
      className={cn([
        'transition-all duration-1000 px-4 py-8',
        'prose prose-sm sm:prose-base md:prose-xl ',
        'w-full sm:max-w-[420px] md:sm:max-w-[600px] lg:max-w-[800px] mx-auto',
      ])}
    >
      <Navbar />

      <h3 className="bg-yellow-300 rounded-lg px-2 py-1">
        This Page Is Work In Process
      </h3>

      <h1 className="!mb-0 font-semibold">
        <span className="font-black">M</span>y{' '}
        <span className="font-black">M</span>ost{' '}
        <span className="font-black">V</span>aluable{' '}
        <span className="font-black">P</span>rofessionals
      </h1>

      <h4 className="!mt-0 !mb-0">
        The Most Valuable Names of the Industry in Türkiye
      </h4>

      <i>List order does not mean priority.</i>
      <p></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MMVPs.map((mmvp) => (
          <div
            key={mmvp.name}
            onClick={() => setSelectedMMVP(mmvp)}
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

      {selectedMMVP && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4  z-50" 
        >
          <div 
            className="bg-white rounded-lg p-6 md:p-8 transition-[opacity] duration-300 max-w-6xl w-full relative"
          >
            <button
              onClick={() => setSelectedMMVP(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-h-[80vh] overflow-y-auto">
              <Image
                src={selectedMMVP.profileImage}
                alt={selectedMMVP.name}
                className="w-32 h-32 rounded-full border !m-0"
              />

              <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold !m-0">
                  {selectedMMVP.name}
                </h2>
                <h3 className="text-gray-600 !m-0 !mt-2">
                  {selectedMMVP.title}
                </h3>
                <p className="text-gray-700 !m-0 !mt-4">
                  {selectedMMVP.description}
                </p>
                <Link href={selectedMMVP.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 !m-0 mt-4">
                  <FaLinkedin className="text-xl" />
                  Connect on LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

