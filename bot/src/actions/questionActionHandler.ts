import { MessageFactory, TurnContext } from 'botbuilder';
import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import responseCard from "../adaptiveCards/response.json";
import { ContentBubbleUrlInfo, QuestionActionHandlerData } from '../types';

export default class QuestionActionHandler implements TeamsFxAdaptiveCardActionHandler {
    triggerVerb = "question";

    async handleActionInvoked(context: TurnContext, actionData: QuestionActionHandlerData) {
        // get the question selected in the executed card
        const { question } = actionData;
        // create an encoded url to the dialog page, passing question and botId context in querystring
        const url = encodeURIComponent(`${process.env.FRONTEND_ENDPOINT}${process.env.FRONTEND_INDEX_PATH}/tab?question=${encodeURIComponent(question)}&botId=${process.env.BOT_ID}`)
        // create a url to invoke the content bubble
        const externalResourceUrl = generateContentBubbleUrl({
            appId: process.env.TEAMS_APP_ID,
            url,
            height: 500,
            width: 500,
            title: encodeURIComponent('Provide your feedback'),
            botId: process.env.BOT_ID,
        });
        // create next steps message
        const contentBubble = MessageFactory.text('**Please provide your valuable feedback**');
        // update message to send on behalf of the user and to invoke the content bubble
        contentBubble.channelData = {
            onBehalfOf: [
                {
                    itemId: 0,
                    mentionType: 'person',
                    mri: context.activity.from.id,
                    displayname: context.activity.from.name
                }
            ],
            notification: {
                alertInMeeting: true,
                externalResourceUrl: externalResourceUrl
            }
        };
        // send the message to the meeting chat and invoke the content bubble
        await context.sendActivity(contentBubble);
        // render a new card as a response to the executed card
        const response = AdaptiveCards.declare(responseCard).render({ title: "✅ Question Set", body: `You selected '${question}'` });
        // replace the original card with the response
        return InvokeResponseFactory.adaptiveCard(response);
    }
}

const generateContentBubbleUrl = (info: ContentBubbleUrlInfo) => {
    return `https://teams.microsoft.com/l/bubble/${info.appId}?url=${info.url}&height=${info.height}&width=${info.width}&title=${info.title}&completionBotId=${info.botId}`;
}
