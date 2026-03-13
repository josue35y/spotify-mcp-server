import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
dotenv.config();
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID.trim(),
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET.trim()
});
async function test() {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log("✅ Spotify authentication successful");
        const result = await spotifyApi.searchTracks("Daft Punk");
        console.log("🎵 First track:");
        console.log(result.body.tracks.items[0].name);
    }
    catch (error) {
        console.error("❌ Error:", error.body || error);
    }
}
test();
//# sourceMappingURL=testSpotify.js.map