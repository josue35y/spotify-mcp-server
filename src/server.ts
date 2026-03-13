import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spotifyApi, authenticate } from "./spotify.js";
import { searchSongs } from "./tools/searchSongs.js"
import { createPlaylist } from "./tools/createPlaylist.js"


const server = new McpServer({
  name: "spotify-mcp",
  version: "1.0.0"
});





server.tool(
  "searchSongs",
  "Search songs on Spotify",
  { query: z.string() },
  async ({ query }) => {

    const tracks = await searchSongs(query)

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tracks, null, 2)
        }
      ]
    }
  }
)



server.tool(
  "add_song_to_playlist",
  "Add song to playlist",
  {
    playlistId: z.string(),
    trackUri: z.string()
  },
  async ({ playlistId, trackUri }) => {

    await spotifyApi.addTracksToPlaylist(
      playlistId,
      [trackUri]
    )

    return {
      content: [
        {
          type: "text",
          text: "Canción agregada a la playlist"
        }
      ]
    }

  }
)


server.tool(
  "create_playlist",
  "Create a Spotify playlist",
  { name: z.string() },
  async ({ name }) => {

    const playlist = await createPlaylist(name)

    return {
      content: [
        {
          type: "text",
          text: `Playlist creada: ${playlist.name}`
        }
      ]
    }

  }
)


async function start() {

  try {
    console.error("Authenticating with Spotify...");
    await authenticate();
    console.error("Spotify authenticated");
  } catch (error) {
    console.error("Spotify authentication failed:", error);
    process.exit(1);
  }
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
start();
