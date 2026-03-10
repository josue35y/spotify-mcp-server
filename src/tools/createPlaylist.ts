import { spotifyApi } from "../spotify.js"

export async function createPlaylist(name: string) {

  const user = await spotifyApi.getMe()

  const playlist = await spotifyApi.createPlaylist(
    user.body.id,
    { name } as any
  )

  return (playlist as any).body
}