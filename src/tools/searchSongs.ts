import { spotifyApi, authenticate } from "../spotify.js";

export async function searchSongs(query) {

  await authenticate();

  const result = await spotifyApi.searchTracks(query);

  return result.body.tracks.items.map(track => ({
    name: track.name,
    artist: track.artists[0].name,
    uri: track.uri
  }));
}