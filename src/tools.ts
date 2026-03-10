import { spotifyApi } from "./spotify.js";

export async function searchTrack(query: string) {

  const result = await spotifyApi.searchTracks(query);

  return result.body.tracks?.items.map(track => ({
    name: track.name,
    artist: track.artists.map(a => a.name).join(", "),
    url: track.external_urls.spotify
  }));
}