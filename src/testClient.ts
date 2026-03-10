import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {

  const transport = new StdioClientTransport({
    command: "node",
    args: ["--loader", "ts-node/esm", "src/server.ts"]
  });

  const client = new Client({
    name: "spotify-test-client",
    version: "1.0.0"
  });

  await client.connect(transport);

  const tools = await client.listTools();

  console.log("TOOLS DISPONIBLES:");
  console.log(tools);

  const result = await client.callTool({
    name: "search_songs",
    arguments: {
      query: "Imagine Dragons"
    }
  });

  console.log("RESULTADO:");
  console.log(result);

}

main();