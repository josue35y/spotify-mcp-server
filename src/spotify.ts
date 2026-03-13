import SpotifyWebApi from "spotify-web-api-node";
import "dotenv/config";

const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();

export const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});

export async function authenticate() {
  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env"
    );
  }

  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
}

