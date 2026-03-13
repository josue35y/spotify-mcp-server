import SpotifyWebApi from "spotify-web-api-node";


export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID?.trim(),
clientSecret: process.env.SPOTIFY_CLIENT_SECRET?.trim(),
});

export async function authenticate() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
}

