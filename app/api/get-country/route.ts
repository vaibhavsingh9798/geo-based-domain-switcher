import { NextRequest, NextResponse } from 'next/server';
import { getCountryFromCoords } from '@/lib/geo';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lng = req.nextUrl.searchParams.get('lng');
 
  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const countryCode = await getCountryFromCoords(lat, lng);
    return NextResponse.json({ countryCode });
  } catch (err) {
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return NextResponse.json({ error: 'Failed to get country' }, { status: 500 });
  }
}
