import { z } from "zod";
import { spotifyApi } from "../spotify.js";

export async function searchSongs(query: string) {

  const result = await spotifyApi.searchTracks(query)

  return result.body.tracks?.items.map(track => ({
    id: track.id,
    uri: track.uri,
    name: track.name,
    artist: track.artists[0].name
  }))

}


