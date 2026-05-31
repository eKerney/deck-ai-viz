import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.ARCGIS_KEY || '';
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key missing' },
      {
        status: 500,
      }
    );
  }

  const tokenRes = await fetch('https://www.arcgis.com/sharing/rest/oauth2/token/', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ARCGIS_CLIENT_ID || '',
      client_secret: process.env.ARCGIS_CLIENT_SECRET || '',
    }),
  });
  const { access_token } = await tokenRes.json();

  const { searchParams } = new URL(request.url);
  const categoryIds = searchParams.get('categoryIds') || '';
  const x = searchParams.get('x') || '';
  const y = searchParams.get('y') || '';
  const radius = searchParams.get('radius') || '5000';
  const pageSize = searchParams.get('pageSize') || '20';

  const url = `https://places-api.arcgis.com/arcgis/rest/services/places-service/v1/places/near-point?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&f=pjson&radius=${radius}&categoryIds=${encodeURIComponent(categoryIds)}&pageSize=${encodeURIComponent(pageSize)}`;

  try {
    const response = await fetch(url, {
      headers: { "Authorization": `Bearer ${access_token}` }
    })

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Places API error: ${response.status} ${response.statusText} - ${text}`);
    }
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return NextResponse.json(data.results || []);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
