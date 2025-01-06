import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get('feedUrl');

  if (!feedUrl) {
    return NextResponse.json(
      { error: 'Feed URL is required' },
      { status: 400 }
    );
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    return NextResponse.json(feed, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed', details: error.message },
      { status: 500 }
    );
  }
}
