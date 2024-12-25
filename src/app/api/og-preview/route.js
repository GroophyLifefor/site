import { NextResponse } from 'next/server'

const cache = new Map();
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

function isCacheValid(timestamp) {
  return (Date.now() - timestamp) < CACHE_EXPIRATION;
}

function getCachedData(target) {
  const cached = cache.get(target);
  if (cached && isCacheValid(cached.timestamp)) {
    console.log('Cache hit for', target);
    return cached.data;
  }
  cache.delete(target);
  return null;
}

async function fetchOgTags(target) {
  let fetchedData = {};
  try {
    fetchedData = await fetch(target);
  } catch {
    console.log('Technically failed to fetch the target page', target, fetchedData);
    return null;
  }

  if (!fetchedData.ok) {
    console.log('Failed to fetch the target page', target, fetchedData);
    return null;
  }

  const html = await fetchedData.text();
  const ogtags = html.match(/<meta property="og:(.+?)" content="(.+?)"/g);
  if (!ogtags) return {};

  return ogtags.reduce((acc, tag) => {
    const [, key, value] = tag.match(/<meta property="og:(.+?)" content="(.+?)"/);
    acc[key] = value;
    return acc;
  }, {});
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('url');
  if (!target) {
    console.log('Missing url parameter', target);
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  const cachedData = getCachedData(target);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  const data = await fetchOgTags(target);
  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch the target page' }, { status: 400 });
  }

  cache.set(target, { data, timestamp: Date.now() });
  console.log(target, data);
  return NextResponse.json(data);
}