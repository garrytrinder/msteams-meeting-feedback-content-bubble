import questionCard from "../adaptiveCards/question.json";
import { CommandMessage, MessageBuilder, TeamsFxBotCommandHandler } from "@microsoft/teamsfx";
import { Activity, TurnContext } from "botbuilder";
import { QuestionCard } from "../types";

export default class BotCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: string = "";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<Partial<Activity>> {
    // define questions to render in the adaptive card
    const questionsData: QuestionCard = {
      questions: [
        { text: '💰 Approve 5% dividend payment to shareholders' },
        { text: '🧑‍🔬 Increase research budget by 10%' },
        { text: '🏡 Continue with WFH for next 3 months' }
      ]
    }
    // return an adaptive card when the bot is mentioned
    return MessageBuilder.attachAdaptiveCard<QuestionCard>(questionCard, questionsData);
  }
}
