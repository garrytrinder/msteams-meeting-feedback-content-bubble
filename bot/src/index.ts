import * as restify from "restify";
import { commandBot } from "./internal/initialize";
import { TeamsConversationBot } from "./internal/teamsActivityHandler";

// bot containing the TeamsActivityHandler
const bot = new TeamsConversationBot();

// create the server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

// process incoming requests through the bot and process activities
server.post("/api/messages", async (req, res) => {
  await commandBot.adapter.process(req, res as any, (context) => bot.run(context))
});
