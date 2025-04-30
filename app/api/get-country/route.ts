import { NextRequest, NextResponse } from 'next/server';
import { getCountryFromCoords } from '@/lib/geo';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
  console.log('lat----------lng', lat , lng);
  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const countryCode = await getCountryFromCoords(lat, lng);
    return NextResponse.json({ countryCode });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to get country' }, { status: 500 });
  }
}
