'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function PreviewLink({ href, target = '_blank', children, ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = async () => {
    setShowTooltip(true);
    if (!previewData) {
      setLoading(true);
      try {
        const ourHostname = window.location.host;
        const ourProtocol = window.location.protocol;
        // if the link don't have our hostname and it's not external, add it
        if (!href.includes(ourHostname) && !href.startsWith('http')) {
          href = `${ourProtocol}//${ourHostname}${href}`;
        } 
        const response = await fetch(`/api/og-preview?url=${encodeURIComponent(href)}`);
        const data = await response.json();
        if (!data.title && !data.description && !data.image) {
          const hostname = new URL(href).hostname;
          setPreviewData({
            title: 'No preview available',
            description: hostname,
          });
          return;
        }
        setPreviewData({
          title: data.title || 'No title',
          description: decodeURIComponent(data.description) || 'No description',
          image: data.image || null,
        });
      } catch (error) {
        console.error('Failed to fetch preview:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <Link
        href={href}
        {...props}
        target={target}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </Link>
      <div
        className={`absolute z-10 w-72 p-2 bg-white rounded-lg shadow-lg border border-gray-200 -translate-x-1/2 left-1/2 !m-0 
          transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          visibility: showTooltip ? 'visible' : 'hidden',
        }}
      >
        {loading && <p className="text-gray-500">Loading...</p>}
        <div className={`transition-opacity duration-300 ${!loading && previewData ? 'opacity-100' : 'opacity-0'}`}>
          {previewData?.image && (
            <Image
              src={previewData.image}
              alt=""
              width={270}
              height={150}
              className="w-full h-auto rounded-md !m-0 !mb-3"
              quality={90}
            />
          )}
          <h4 className="text-gray-800 !m-0 mb-2">{previewData?.title}</h4>
          <p className="text-gray-600 !m-0">{previewData?.description}</p>
        </div>
      </div>
    </div>
  );
}
