
import { ConversationBot } from "@microsoft/teamsfx";
import QuestionActionHandler from "../actions/questionActionHandler";
import BotCommandHandler from "../commands/botCommandHandler";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: process.env.BOT_ID,
    appPassword: process.env.BOT_PASSWORD,
  },
  command: {
    enabled: true,
    commands: [new BotCommandHandler()],
  },
  cardAction: {
    enabled: true,
    actions: [
      new QuestionActionHandler()
    ]
  }
});
