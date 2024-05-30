import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Function to get Spotify access token
const getSpotifyAccessToken = async () => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // Manually constructing the data string
  const data = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, { headers });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to retrieve access token', error);
    return null;
  }
};

// API route to return only the access token
export async function GET() {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) {
    return new NextResponse('Internal Error', { status: 500 });
  }
  return NextResponse.json({ accessToken: accessToken });
}
