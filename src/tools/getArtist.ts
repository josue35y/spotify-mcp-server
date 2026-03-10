import { z } from "zod";
import { spotifyApi } from "../spotify.js";

export const getArtistTool = {

  name: "get_artist",

  description: "Get information about an artist",

  schema: z.object({
    name: z.string()
  }),

  handler: async ({ name }: { name: string }) => {

    const result = await spotifyApi.searchArtists(name);

    const artist = result.body.artists?.items[0];

    if (!artist) return null;

    return {
      name: artist.name,
      followers: artist.followers.total,
      genres: artist.genres,
      url: artist.external_urls.spotify
    };
  }
};